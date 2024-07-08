import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { node_env, server } from './parse-cfg/parse-cfg';
import { AppEnv } from './parse-cfg/app-env';
import { CustomExceptionFilter } from './utils/filters/custom-exception-filter';
import { CustomResponseInterceptor } from './utils/filters/response-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (node_env != AppEnv.production) {
    const config = new DocumentBuilder()
      .setTitle('API description')
      .setVersion(`1.0 ${node_env}`)
      .setContact(
        'sololineabuse',
        'https://tenor.com/ru/view/%C3%BAj-h%C3%A9t-gif-280840680672964893',
        'sorenharfagri@gmail.com',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }


  app.useGlobalFilters(new CustomExceptionFilter())
  app.useGlobalInterceptors(new CustomResponseInterceptor())

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(server.port);
}
bootstrap();
