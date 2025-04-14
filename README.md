# Node.js REST API for Managing Contacts

This is a simple Node.js REST API for managing a list of contacts. It allows you to create, read, update, and delete contacts.

## Table of Contents

- [Installation](#installation)
- [Project Setup](#project-setup)
- [API Endpoints](#api-endpoints)
- [Contact Schema](#contact-schema)
- [Error Handling](#error-handling)

## Installation

Clone the repository:

```bash
git clone https://github.com/tobolovskaya/goit-node-rest-api
cd goit-node-rest-api
```

Install dependencies:

```bash
npm install
```

Create a `.env` file for environment variables (e.g., database configuration):

```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=contacts_db
DB_PORT=5432
```

## Project Setup

Start the server:

```bash
npm start
```

The server will run at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Get all contacts

```http
GET /api/contacts
```

### Get a contact by ID

```http
GET /api/contacts/:id
```

### Create a new contact

```http
POST /api/contacts

Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123-456-7890"
}
```

### Update a contact by ID

```http
PUT /api/contacts/:id

Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "098-765-4321"
}
```

### Delete a contact by ID

```http
DELETE /api/contacts/:id
```

## Contact Schema

- **id**: unique identifier (UUID)
- **name**: contact name (required)
- **email**: contact email (required, unique)
- **phone**: contact phone number (required)
- **createdAt** and **updatedAt**: timestamps for creation and last update

## Error Handling

- **400 Bad Request**: invalid request data
- **404 Not Found**: contact not found
- **500 Internal Server Error**: server error

Errors are returned in JSON format:

```json
{
  "message": "Not found"
}
```



