import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('balabala-后台API')
    .setDescription('供后台界面调用的服务端API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const Port = process.env.ADMIN_PORT || 3002;
  await app.listen(Port);
  console.log(`http://localhost:${Port}/api-docs`);
}
bootstrap();