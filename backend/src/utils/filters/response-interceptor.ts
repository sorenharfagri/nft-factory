import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class CustomResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const http = context.switchToHttp()
        const response = http.getResponse()

        return next.handle().pipe(
            map(responseDate => {
                let newResponse = {
                    data: responseDate,
                    statusCode: response.statusCode,
                    error: ''
                }

                if (!newResponse.data) {
                    newResponse.data = {}
                }
                
                return newResponse
            })
        )
    }
}
