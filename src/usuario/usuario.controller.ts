import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { FiltroUsuarioHttpException } from './validacao/filtro.usuario.http.exception';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(
    private usuarioRepository: UsuarioRepository, 
    private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {

    const listaUsuarioDTO : ListaUsuarioDTO = await this.usuarioService.criaUsuario(dadosDoUsuario);

    //const usuarioEntity : UsuarioEntity = this.usuarioService.criaUsuario(dadosDoUsuario);
    /*
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.id = uuid();*/    

    return {
      //usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      usuario: listaUsuarioDTO,
      messagem: 'usuário criado com sucesso',
    };
  }

  @Get()
  async listUsuarios() {
    //const usuariosSalvos = await this.usuarioRepository.listar();
    /*const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );*/

    //return this.usuarioService.listaUsuario(usuariosSalvos);
    //return usuariosLista;

    return this.usuarioService.listaUsuario();

  }

  @Put('/:id')
  @UseFilters(new FiltroUsuarioHttpException())
    async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
      const usuarioAtualizado = await this.usuarioService.atualizaUsuario(id, novosDados);

      //console.log('controller: ' + (await usuarioAtualizado).id + ' ' + (await usuarioAtualizado).nome);

      /*
      const usuarioAtualizado = await this.usuarioRepository.atualiza(
        id,
        novosDados,
      );
      */

      return {
        usuario: usuarioAtualizado,
        messagem: 'usuário atualizado com sucesso',
      };
  }

  @Delete('/:id')
  @UseFilters(new FiltroUsuarioHttpException())
  async removeUsuario(@Param('id') id: string) {
    //const usuarioRemovido = await this.usuarioRepository.remove(id);
    const usuarioRemovido = await this.usuarioService.removeUsuario(id);

    return {
      usuario: usuarioRemovido,
      messagem: 'usuário removido com suceso',
    };
  }

}
