import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Enable CORS
  app.enableCors();

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Portfolio API Documentation')
    .setDescription(
      `
      This API serves as a portfolio piece demonstrating modern backend development practices.
      
      ## Features
      - JWT Authentication
      - Role-based Access Control
      - User Management
      - Admin Dashboard
      - Database Integration
      
      ## Authentication
      Most endpoints require authentication. Use the login endpoint to get a JWT token.
      Include the token in the Authorization header as: \`Bearer <token>\`
    `,
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('admin', 'Admin management endpoints')
    .addTag('user', 'User management endpoints')
    .addTag('portfolio', 'Portfolio management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
  });

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
