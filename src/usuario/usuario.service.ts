import { Injectable } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { UsuarioRepository } from "./usuario.repository";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Injectable()
export class UsuarioService{
    constructor(private usuarioRepository: UsuarioRepository){}

    async criaUsuario(dadosDoUsuario: CriaUsuarioDTO)
    {
        const usuarioEntity = new UsuarioEntity();
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.id = uuid();

        this.usuarioRepository.salvar(usuarioEntity);

        return new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome);

        //return usuarioEntity;
    }

    async listaUsuario()
    {
        const usuariosSalvos : UsuarioEntity[] = await this.usuarioRepository.listar(); 

        return usuariosSalvos.map(
            (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
          );
    }

    async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO)
    {
        const usuarioAtualizado = await this.usuarioRepository.atualiza(
            id,
            novosDados,
          );

          //console.log('service: ' + usuarioAtualizado.id + ' ' + usuarioAtualizado.nome);
          //console.log(usuarioAtualizado);

        return new ListaUsuarioDTO(id, usuarioAtualizado.nome);
    }

    async removeUsuario(id: string)
    {
        const usuarioRemovido = await this.usuarioRepository.remove(id);

        return new ListaUsuarioDTO(id, usuarioRemovido.nome);
    }
}