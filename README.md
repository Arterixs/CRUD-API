<h1 align="center">CRUD API</h1>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Description of API work</a>
    </li>
  </ol>
</details>

## About the project

This is a The Rolling School Scopes task that created a simple CRUD API using an in-memory database.

### Built With

This section lists all the main tools with which this project was built.

- Node JS
- Typescript
- Jest
- Supertest
- uuid
- ESlint

### Features

This section describes the functionality of the application.

- [x] GET request
- [x] POST request
- [x] PUT request
- [x] Delete request
- [x] Validation of received data
- [x] API test coverage

## Getting Started

This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install dependencies

   ```sh
   npm install
   ```

3. You can use **Postman** to test the application.
4. Enjoy coding!

### Description of API work

- The application has two modes of operation (**development** and **production**):

  - - Development - `npm run start:dev`
  - - Production - `npm run start:prod`

- To run tests, use the command ` npm run test`
- Implemented endpoint `api/users`
- Implemented the following query methods:

  - - **GET** - `api/users` is used to get all persons
  - - **GET** - `api/users/{userId}` is used to get person
  - - **POST** - `api/users` is used to create record about new user and store it in database
  - - **PUT** - `api/users/{userId}` is used to update existing user
  - - **DELETE** - `api/users/{userId}` is used to delete existing user from database

- The body of the **POST** or **PUT** request is an JSON object with the following properties:

  - - **username** — users name (string, **required**)
  - - **age** — users age (number, **required**)
  - - **hobbies** — users hobbies (array of strings or empty array, **required**)

- The response of the **POST** or **PUT** request is an JSON object with the following properties:

  - **username** — users name (string)
  - **age** — users age (number)
  - **hobbies** — users hobbies (array of strings or empty array)
  - **id** - unique identifier generated on server side (string)
