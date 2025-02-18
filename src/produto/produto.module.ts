import { Module } from '@nestjs/common';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ProdutoController } from './produto.controller';
import { ProdutoRepository } from './produto.repository';
import { FiltroProdutoHttpException } from 'src/usuario/validacao/filtro.produto.http.exception';

@Module({
  imports: [UsuarioModule],
  controllers: [ProdutoController],
  providers: [ProdutoRepository, FiltroProdutoHttpException],
})
export class ProdutoModule {}
