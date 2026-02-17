# NestJS Portfolio API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

A robust and scalable backend API built with NestJS, showcasing modern backend development practices, clean architecture, and best practices in TypeScript. This project serves as a portfolio piece demonstrating expertise in:

- RESTful API design
- Authentication & Authorization
- Database management
- API documentation
- Testing
- Security best practices

## Features

- 🔐 JWT Authentication
- 📝 Swagger API Documentation
- 🛡️ Role-based Access Control
- 📊 Database Integration
- 🧪 Unit & E2E Testing
- 🔄 Cron Jobs
- 🚀 Production-ready Configuration

## Tech Stack

- NestJS
- TypeScript
- Swagger/OpenAPI
- JWT Authentication
- Role-based Access Control
- Database (MongoDB/PostgreSQL)
- Jest for Testing

## Installation

```bash
# Clone the repository
$ git clone https://github.com/yourusername/nest-portfolio.git

# Install dependencies
$ npm install

# Set up environment variables
$ cp .env.example .env
$ # Edit .env with your configuration
```

## Running the App

```bash
# Development
$ npm run start:dev

# Production
$ npm run start:prod

# Watch mode
$ npm run start:dev
```

## API Documentation

Once the application is running, access the Swagger documentation at:
```
http://localhost:3000/api
```

## Testing

```bash
# Unit tests
$ npm run test

# E2E tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## Project Structure

```
src/
├── auth/           # Authentication module
├── user/           # User management
├── admin/          # Admin features
├── common/         # Shared utilities
├── database/       # Database configuration
├── guards/         # Authentication guards
└── cron/           # Scheduled tasks
```

## API Endpoints

### Authentication
- POST /auth/login
- POST /auth/register
- POST /auth/refresh-token

### User Management
- GET /users/profile
- PUT /users/profile
- GET /users
- GET /users/:id

### Admin
- GET /admin/users
- PUT /admin/users/:id
- DELETE /admin/users/:id

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
