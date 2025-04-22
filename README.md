# Node.js REST API - Homework 6

This project is a simple Node.js REST API application designed for managing contacts. It provides functionalities for creating, reading, updating, and deleting contact entries, along with user authentication.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [License](#license)

## Installation

Follow these steps to set up the project:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/tobolovskaya/goit-node-rest-api
   cd goit-node-rest-api
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the project root and set the following:

   ```env
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASS=your_database_password
   JWT_SECRET=your_jwt_secret
   ```

## Usage

Start the application server:

```sh
npm start
```

The server will start on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Contacts Management

- `GET /api/contacts`: Retrieve all contacts.
- `GET /api/contacts/:id`: Retrieve a contact by ID.
- `POST /api/contacts`: Add a new contact.
- `PUT /api/contacts/:id`: Update an existing contact by ID.
- `PATCH /api/contacts/:id/favorite`: Update the "favorite" status of a contact.
- `DELETE /api/contacts/:id`: Delete a contact by ID.

### User Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: User login.
- `POST /api/auth/logout`: User logout.
- `GET /api/auth/current`: Get current user details.
- `PATCH /api/auth/avatars`: Update user avatar.

## Authentication

The API employs JSON Web Tokens (JWT) for authentication. For protected endpoints, the JWT token must be provided in the `Authorization` header as follows:

### Register

```sh
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{
  "email": "user@example.com",
  "password": "password"
}'
```

### Login

```sh
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{
  "email": "user@example.com",
  "password": "password"
}'
```

Successful login response includes a JWT token:

```json
{
  "token": "your_jwt_token",
  "user": {
    "email": "user@example.com",
    "subscription": "starter"
  }
}
```

### Accessing Protected Endpoints

Use the JWT token in your request headers:

```sh
curl -X GET http://localhost:3000/api/contacts -H "Authorization: Bearer your_jwt_token"

### Update Avatar

To update the user's avatar, use the `/api/auth/avatars` endpoint with a `PATCH`
request. The request should include the avatar file in the `multipart/form-data`
format and the JWT token in the `Authorization` header.

```sh
curl -X PATCH http://localhost:3000/api/auth/avatars -H "Authorization: Bearer your_jwt_token" -F "avatar=@path_to_your_avatar_file"
```

The response will include the new avatar URL:

```json
{
  "avatarURL": "/avatars/your_avatar_filename"
}
```
### Verify User Email

To verify the user's email, use the `/api/auth/verify/:verificationToken`
endpoint with a `GET` request. The request should include the verification token
in the URL.

```sh
curl -X GET http://localhost:3000/api/auth/verify/your_verification_token
```

The response will include a success message:

```json
{
  "message": "Verification successful"
}
```

### Resend Verification Email

To resend the verification email, use the `/api/auth/verify` endpoint with a
`POST` request. The request should include the user's email in the request body.

```sh
curl -X POST http://localhost:3000/api/auth/verify -H "Content-Type: application/json" -d '{
  "email": "user@example.com"
}'
```

The response will include a success message:

```json
{
  "message": "Verification email sent"
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.