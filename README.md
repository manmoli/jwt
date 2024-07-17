
# Project Name

## Overview
This project is a Node.js application built with TypeScript, utilizing Express for the server framework. It demonstrates how JSON Web Tokens (JWT) work for authentication and authorization. Docker is used to containerize the PostgreSQL database, making it easy to set up and run.

## Directory Structure
```
.
├── docker-compose.yml
├── package.json
├── package-lock.json
├── src
│   ├── auth.ts
│   ├── config.ts
│   ├── db.ts
│   ├── index.ts
│   ├── interfaces.ts
│   ├── services.ts
│   └── types
│       └── express.d.ts
└── tsconfig.json
```

### Files and Directories
- **docker-compose.yml**: Configuration file for Docker, used to define and run the PostgreSQL database container.
- **package.json**: Contains metadata about the project, including dependencies and scripts.
- **package-lock.json**: Automatically generated file that contains the exact versions of installed dependencies.
- **src/**: Source code directory.
  - **auth.ts**: Contains JWT authentication logic, including token generation and verification.
  - **config.ts**: Configuration settings for the application, including environment variables.
  - **db.ts**: Sets up the database connection and includes functions for database operations.
  - **index.ts**: Entry point of the application, setting up the Express server and routes.
  - **interfaces.ts**: TypeScript interfaces for type definitions.
  - **services.ts**: Contains business logic and service functions used by the application.
  - **types/**: Custom TypeScript type definitions.
    - **express.d.ts**: Custom type definitions for Express.

## Prerequisites
- Node.js (version 14.x or higher)
- Docker (for containerizing the database)
- PostgreSQL client (optional, for database management)

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the necessary environment variables. Example:
   ```sh
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=yourusername
   DB_PASS=yourpassword
   DB_NAME=yourdatabase
   JWT_SECRET=your_jwt_secret
   ```

## Running the Application

### Setting Up the Database
1. Ensure Docker is installed and running on your machine.
2. Build and start the PostgreSQL database container:
   ```sh
   docker-compose up -d
   ```

### Starting the Application
1. Ensure the database is running and the environment variables are set up correctly.
2. Start the application:
   ```sh
   npm start
   ```

## How It Works
The application demonstrates JWT authentication by implementing the following flow:
1. **User Registration/Login**: Users can register or log in to receive a JWT.
2. **Token Generation**: On successful authentication, a JWT is generated and sent to the user.
3. **Protected Routes**: Certain routes are protected and require a valid JWT for access. The JWT is verified for each request to these routes.

## Testing the Application

### Using Curl
You can test the application using `curl` commands to interact with the API.

1. **Register a New User**:
   ```sh
   curl -X POST http://localhost:3000/register -H "Content-Type: application/json" -d '{"username":"testuser", "password":"testpassword"}'
   ```

2. **Login**:
   ```sh
   curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"testuser", "password":"testpassword"}'
   ```

   This will return a JWT token.

3. **Access Protected Route**:
   ```sh
   curl -X GET http://localhost:3000/protected -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

## Scripts

- `npm start`: Starts the application using `ts-node`.

## Configuration

### TypeScript Configuration
The `tsconfig.json` file includes configurations for the TypeScript compiler:
```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "typeRoots": ["./node_modules/@types", "./src/types"],
    "sourceMap": true
  },
  "include": [
    "src",
    "src/types/express.d.ts"
  ],
  "files":["src/types/express.d.ts"]
}
```

### Docker Configuration
The `docker-compose.yml` file includes the service definitions for the PostgreSQL database container:
```yaml
version: '3.8'

services:
  db:
    image: postgres:13
    environment:
      POSTGRES_USER: yourusername
      POSTGRES_PASSWORD: yourpassword
      POSTGRES_DB: yourdatabase
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For any questions or issues, please contact [manuelmolinapena@gmail.com].
