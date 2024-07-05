## Jobly API

Jobly is a RESTful API for managing job listings and company information. This document provides a comprehensive guide for setting up, running, and using the API.

1. Table of Contents
2. Requirements
3. Installation
4. Configuration
5. Testing
6. Running the Application
7. Running Tests
8. API Endpoints
9. Authentication Routes
10. Company Routes
11. User Routes
12. Job Routes
13. Error Handling
14. Database Schema
15. Environment Variables
16. Requirements
17. Node.js v14 or higher
18. PostgreSQL 12 or higher
19. Installation
20. Clone the repository:

```sh
Copy code
git clone https://github.com/yourusername/jobly.git
cd jobly
Install dependencies:

sh
Copy code
npm install
Set up the database:

sh
Copy code
createdb jobly
psql jobly < data.sql
(Optional) Set up the test database:

sh
Copy code
createdb jobly_test
psql jobly_test < data.sql
Configuration
Environment Variables
Create a .env file in the root directory of your project and add the following environment variables:

env
Copy code
DB_USER=joseph
DB_PASSWORD=Buddha14!
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=jobly
NODE_ENV=development
SECRET_KEY=secret-dev
PORT=3001
Create a .env.test file for testing environment:

env
Copy code
DB_USER=test_user
DB_PASSWORD=test_pass
DB_HOST=test_host
DB_PORT=5001
DB_DATABASE=jobly_test
NODE_ENV=test
SECRET_KEY=test-secret
PORT=3001
Running the Application
Start the server:

sh
Copy code
npm start
The server will be running on http://localhost:3001.

Running Tests
Run the tests using Jest:

sh
Copy code
npm test
Ensure you have the .env.test file properly configured to use the test database.
```

## Testing

### Running Tests

To ensure the integrity and functionality of the application, we use Jest for testing. Follow the steps below to run all tests:

Ensure you have set up the test environment variables in a .env.test file. This file should contain the necessary configuration for the test database and other environment-specific settings.

Run the tests using the following command:

```sh
Copy code
NODE_ENV=test jest -i
Explanation:
NODE_ENV=test: This sets the environment to "test" which will ensure that the application uses the test database and other test-specific configurations.
jest -i: This command runs Jest in interactive mode, which is helpful for running and managing tests efficiently.
Running this command will execute all test files in your project, and you will see the test results in the terminal. Make sure your test database is set up and configured correctly to avoid any issues during testing.
```

## API Endpoints

### Authentication Routes

```sh
POST /auth/token
Description: Returns a JWT token which can be used to authenticate further requests.
Request Body:
json
Copy code
{
"username": "user1",
"password": "password1"
}
Response:
json
Copy code
{
"token": "jwt-token"
}
Company Routes
GET /companies
Description: Get a list of all companies.
Response:
json
Copy code
[
{
"handle": "apple",
"name": "Apple Inc.",
"description": "Innovative tech company",
"numEmployees": 100000,
"logoUrl": "http://apple.com/logo.png"
},
...
]
POST /companies
Description: Create a new company.
Request Body:
json
Copy code
{
"handle": "microsoft",
"name": "Microsoft",
"description": "Tech giant",
"numEmployees": 200000,
"logoUrl": "http://microsoft.com/logo.png"
}
Response:
json
Copy code
{
"handle": "microsoft",
"name": "Microsoft",
"description": "Tech giant",
"numEmployees": 200000,
"logoUrl": "http://microsoft.com/logo.png"
}
User Routes
GET /users
Description: Get a list of all users.
Response:
json
Copy code
[
{
"username": "user1",
"firstName": "User",
"lastName": "One",
"email": "user1@example.com",
"isAdmin": false
},
...
]
POST /users
Description: Create a new user.
Request Body:
json
Copy code
{
"username": "user2",
"password": "password2",
"firstName": "User",
"lastName": "Two",
"email": "user2@example.com",
"isAdmin": false
}
Response:
json
Copy code
{
"username": "user2",
"firstName": "User",
"lastName": "Two",
"email": "user2@example.com",
"isAdmin": false
}
Job Routes
GET /jobs
Description: Get a list of all jobs.
Query Parameters:
minSalary (optional): Minimum salary for the job.
hasEquity (optional): If true, only jobs with equity > 0.
title (optional): Partial match for job title.
limit (optional): Number of jobs to return.
offset (optional): Number of jobs to skip.
Response:
json
Copy code
[
{
"id": 1,
"title": "Software Engineer",
"salary": 120000,
"equity": 0.1,
"companyHandle": "apple",
"companyName": "Apple Inc."
},
...
]
POST /jobs
Description: Create a new job.
Request Body:
json
Copy code
{
"title": "Product Manager",
"salary": 110000,
"equity": 0.05,
"companyHandle": "microsoft"
}
Response:
json
Copy code
{
"id": 2,
"title": "Product Manager",
"salary": 110000,
"equity": 0.05,
"companyHandle": "microsoft"
}
Error Handling
Errors are returned in the following format:

json
Copy code
{
"error": {
"message": "Error message",
"status": 400
}
}
```

## Database Schema

### The database consists of the following tables:

## Companies

handle (primary key): Unique identifier for the company.
name: Name of the company.
description: Description of the company.
numEmployees: Number of employees in the company.
logoUrl: URL of the company's logo.
Jobs
id (primary key): Unique identifier for the job.
title: Title of the job.
salary: Salary for the job.
equity: Equity offered with the job.
company_handle: Foreign key referencing the company.
Users
username (primary key): Unique username for the user.
password: Hashed password for the user.
firstName: First name of the user.
lastName: Last name of the user.
email: Email address of the user.
isAdmin: Boolean indicating if the user is an admin.
Environment Variables
The following environment variables need to be configured:

```javascript DB_USER: Database username.
DB_PASSWORD: Database password.
DB_HOST: Database host.
DB_PORT: Database port.
DB_DATABASE: Database name.
NODE_ENV: Environment (e.g., development, test, production).
SECRET_KEY: Secret key for JWT.
PORT: Port on which the server runs.
```
