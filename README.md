# Homework 2

Create a REST API for managing a collection of contacts. Use [Postman](https://www.getpostman.com/) to test the REST API.

## Step 1

Create a repository named `goit-node-rest-api` and add the contents of the [src](./src) folder directly to the main branch (`main`). Note: The `src` folder itself should not appear in the repository, only its contents.

Create a branch `hw02-express` from the `main` branch.

Install the dependencies:

```bash
npm i
```


## Step 2

In the `contactsServices.js` file (located in the `services` folder), copy the functions from the `contacts.js` file created in Module 1's homework.

## Step 3

Write controllers in the `contactsControllers.js` file (located in the `controllers` folder), following the requirements below.

The REST API should support these routes:

### @ GET /api/contacts

- Calls the `listContacts` service function to work with the `contacts.json` file
- Returns an array of all contacts in JSON format with status `200`

### @ GET /api/contacts/:id

- Calls the `getContactById` service function to work with the `contacts.json` file
- If a contact by `id` is found, returns the contact object in JSON format with status `200`
- If a contact by `id` is not found, returns a JSON object in the format `{"message": "Not found"}` with status `404`

### @ DELETE /api/contacts/:id

- Calls the `removeContact` service function to work with the `contacts.json` file
- If a contact by `id` is found and removed, returns the removed contact object in JSON format with status `200`
- If a contact by `id` is not found, returns a JSON object in the format `{"message": "Not found"}` with status `404`

### @ POST /api/contacts

- Receives `body` in JSON format with fields `{name, email, phone}`. All fields are mandatory - create a validation schema in the `contactsSchemas.js` file (located in the `schemas` folder) using the `joi` package
- If `body` lacks any required fields (or contains invalid fields), returns a JSON object in the format `{"message": error.message}` (where `error.message` is a meaningful error message) with status `400`
- If `body` is valid, calls the `addContact` service function to work with the `contacts.json` file, passing the data from the `body`
- Returns the newly created object with fields `{id, name, email, phone}` and status `201`

### @ PUT /api/contacts/:id

- Receives `body` in JSON format with any combination of updated fields (`name`, `email`, `phone`). Fields are not required in the body: if a field is not passed, it should remain unchanged from its previous value
- If the update request is made without at least one field in the `body`, returns a JSON object in the format `{"message": "Body must have at least one field"}` with status `400`
- Validate the fields passed in the body - create a validation schema in the `contactsSchemas.js` file (located in the `schemas` folder) using the `joi` package. If the fields are invalid, return a JSON object in the format `{"message": error.message}` (where `error.message` is a meaningful error message) with status `400`
- If the `body` is valid, call the `updateContact` service function (to be created in the `contactsServices.js` file located in the `services` folder). This function should accept the `id` of the contact to update and the data from the `body`, and update the contact in the `contacts.json` file
- Return the updated contact object with status `200`
- If a contact by `id` is not found, returns a JSON object in the format `{"message": "Not found"}` with status `404`

### Note

- You can validate the `body` either in the controller or create a separate middleware for this purpose, which will be called before the controller. You can use the `validateBody.js` function located in the `helpers` folder to create this middleware
- For error handling, you can use the `HttpError.js` function located in the `helpers` folder

If you don't use these functions, remove them from the project before submitting your work to the mentor.

## Acceptance Criteria

- Repository created with the homework
- A link to the repository (homework branch) is sent to the mentor for review
- Code meets the technical requirements (requirements regarding the structure of the `body`, content, and status of responses to requests, etc., must be strictly followed)
- No commented-out code sections in the submitted code
- The project works correctly with the current LTS version of Node

