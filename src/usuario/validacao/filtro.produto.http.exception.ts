import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class FiltroProdutoHttpException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (exception instanceof NotFoundException)
    {
        response
        .status(404)//status)
        .json({
          status: status,
          parametros: request.params,
          mensagem: 'Produto não encontrado!'
        });
    }
    else if (exception instanceof BadRequestException)
    {
        response
        .status(400)//status)
        .json({
          status: status,
          body: request.body,
          mensagem: exception.getResponse()
        });
    }
    else{

        response
        .status(status)
        .json({
            status: status,
            parametros: request.params,
            corpo: request.body
        });
    }
  }
}