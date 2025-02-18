import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class FiltroUsuarioHttpException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    //const ex = response//exception.getResponse();

    //console.log(ex);

    if (exception instanceof NotFoundException)
    {
        response
        .status(404)//status)
        .json({
          status: status,
          hora: new Date().toISOString(),
          parametros: request.params,
          mensagem: 'Usuario não encontrado!'
        });
    }
    else if (exception instanceof BadRequestException)
    {
        response
        .status(400)//status)
        .json({
          status: status,
          hora: new Date().toISOString(),
          body: request.body,
          mensagem: exception.getResponse()
        });
    }
    else{

        response
        .status(status)
        .json({
            status: status,
            hora: new Date().toISOString(),
            parametros: request.params,
            corpo: request.body
        });
    }
  }
}