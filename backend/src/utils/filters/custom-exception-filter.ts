import {
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  Catch
} from '@nestjs/common'
import { Request, Response } from 'express'
import { CustomException } from './custom-exception'

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {

  catch(exception: CustomException, host: ArgumentsHost) {
    // console.log('exception', exception.getResponse())
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR

    console.dir(`Exception is `)
    console.log(exception)

    const errorResponse = {
      status,
      error: exception.message || 'Internal Server Error',
      data: {}
    }

    // Class validator handle
    //@ts-ignore
    if (exception.response && exception.response.message) {
      //@ts-ignore
      errorResponse.error = exception.response.message
    }

    response.status(status).json(errorResponse)
  }
}
