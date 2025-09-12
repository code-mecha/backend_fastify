# backend_fastify

This template provides a ready-to-use Node.js API project with Fastify framework and Prisma ORM. It includes built-in support for:

- Database configuration with Prisma (MySQL/PostgreSQL/SQLite)
- Hot reloading with Nodemon
- MVC-like organization (controllers, routes)
- CORS support
- Example resources (people and planets)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) with the [Prisma extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) for database schema visualization.

## Project Setup

1. Install Node.js (version 18 or later)
2. Install dependencies:
```sh
npm install
```
3. Copy `.env.example` to `.env` and configure your database settings:
```sh
cp .env.example .env
```

## Development Commands

### Run with hot-reload
```sh
npm run dev
```

### Run database migrations
```sh
npx prisma migrate dev
```

## Project Structure

- `controllers/`: Request handlers and business logic
- `routes/`: Route definitions and endpoint configuration
- `prisma/`: Database schema, migrations, and seed data
- `server.js`: Main application entry point
