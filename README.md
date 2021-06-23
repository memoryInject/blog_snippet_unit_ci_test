
# Blog Snippet: blog application for testing and CI/CD pipeline
[![CircleCI](https://circleci.com/gh/memoryInject/blog_snippet_unit_ci_test/tree/main.svg?style=svg)](https://circleci.com/gh/memoryInject/blog_snippet_unit_ci_test/tree/main)  

👍 https://blogsnippet.herokuapp.com  

This is a simple blog web app for testing and build a CI/CD pipeline.
It is a PERN stack app (Postgres, Express, React, Node).  

 


### Testing and CI/CD frameworks used:

 - Frontend: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
 - Backend: [Jest](https://jestjs.io/)
 - End-to-End: [Cypress](https://www.cypress.io/)
 - CI/CD: [CircleCI](https://circleci.com/) with [Heroku](https://www.heroku.com/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file and .env.test

#### For development (.env):

`NODE_ENV=development` - Set node environment to development

`PORT=5000` - Set backend server port to 5000

`DATABASE_URL=postgres://postgres:1234@localhost:5432/blogs_dev` - Created local postgres development database

`DATABASE_HOST=localhost`  
`DATABASE_PORT=5432`  
`DATABASE_NAME=blogs_dev`  
`POSTGRES_USER=postgres`  
`POSTGRES_PASSWORD=1234`  

`JWT_SECRET=abc1234` - Json web token secret   
`ADMIN=admin@email.com` - email used for admin access 

#### For testing (.env.test):

`NODE_ENV=test` - Set node environment to test

`PORT=5000` - Set backend server port to 5000

`DATABASE_URL=postgres://postgres:1234@localhost:5432/blogs_test` - Created local postgres test database

`DATABASE_HOST=localhost`  
`DATABASE_PORT=5432`  
`DATABASE_NAME=blogs_test`  
`POSTGRES_USER=postgres`  
`POSTGRES_PASSWORD=1234`  

`JWT_SECRET=abc1234` - Json web token secret   
`ADMIN=admin@email.com` - email used for admin access 

`CYPRESS_KEY=` - Cypress dashbord upload key for recording test


#### For production (.env):

`NODE_ENV=production` - Set node environment to production

`PORT=5000` - Set backend server port to 5000

`DATABASE_URL=` - Production postgres database in [ElephantSQL](https://www.elephantsql.com/)

`DATABASE_HOST=`  
`DATABASE_NAME=`  
`POSTGRES_USER=`  
`POSTGRES_PASSWORD=`  

`JWT_SECRET=` - Json web token secret   
`ADMIN=` - email used for admin access in production
## Installation 
It is a mono repo for both frontend and backend.  

Clone this project to local drive:  
```bash 
  git clone https://github.com/memoryInject/blog_snippet_unit_ci_test.git
  
  cd blog_snippet_unit_ci_test
```

Install with npm:
```bash
  npm install && npm install --prefix client
```

All the backend packages are at the root and 
all the frontend packages are in the client directory. 
## Running Tests


Run the test with npm at the root:
```bash
  npm test
```
This will run both frontend react test and backend server test.

For End-to-End Cypress test, first run both frontend and backend dev server on test mode then open cypress.
```bash
  npm run dev-test
```

Open Cypress on another bash:
```bash
  npm run cypress-open
```
Note: for windows users open cypress in cmd only (not in gitbash)

## Development

Before doing anyting make sure to migrate and seed the database,  
also make sure to run postgres and create blogs_dev database and   
check all the environement variables.

Migrate database:
```bash
  npm run migrate-up
```

Seed database:
```bash
  npm run data-import
```

Run development servers (react and express):
```bash
  npm run dev
```
By default react dev server running on port 3000 and express server running on port 5000.
  
## API Reference


[Insomnia_restAPI.json](https://github.com/memoryInject/blog_snippet_unit_ci_test/blob/main/Insomnia_restAPI.json): for API testing with [Insomania](https://insomnia.rest/)

### User routes

#### *Register a user*
Description: Register a new user and return new user with token  
Access: Public  

```http
  POST /api/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. User name |
| `email` | `string` | **Required**. User email |
| `password` | `string` | **Required**. User password |

---
#### *Login user*
Description: Authenticate user return user with token  
Access: Public  

```http
  POST /api/users/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. User email |
| `password` | `string` | **Required**. User password |

---
#### *Get logged in user*
Description: Get user profile return user      
Access: Private  

```http
  GET /api/users/profile
```

Send `Bearer ` token in the header 

---
#### *Update user profile*
Description: Update user return updated user with token  
Access: Private  

```http
  PUT /api/users/profile
```
Send `Bearer ` token in the header 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Optional**. User name |
| `email` | `string` | **Optional**. User email |
| `password` | `string` | **Optional**. User password |

---
### Blog routes 


#### *Get all blogs* 
Description: Fetch all blogs return array of blogs       
Access: Public  

```http
  GET /api/blogs/
```


---
#### *Get blogs by user*
Description: Get blogs by created user return array of blogs       
Access: Private  

```http
  GET /api/blogs/user
```
Send `Bearer ` token in the header 

---
#### *Create a blog*
Description: Create a single blog return created blog       
Access: Private  

```http
  POST /api/blogs/
```
Send `Bearer ` token in the header 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Blog title |
| `content` | `string` | **Required**. Blog content |  

---
#### *Get blog by id* 
Description: Fetch a single blog       
Access: Public  

```http
  GET /api/blogs/:id
```

---
#### *Update a blog*
Description: Update a single blog return updated blog        
Access: Private and Admin    

```http
  PUT /api/blogs/:id
```
Send `Bearer ` token in the header 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Optional**. Blog title |
| `content` | `string` | **Optional**. Blog content |  

---
#### *Delete a blog*
Description: Delete a single blog return deleted blog        
Access: Private and Admin    

```http
  DELETE /api/blogs/:id
```
Send `Bearer ` token in the header 

---
### Admin routes


#### *Get all users*
Description: Fetch all users       
Access: Admin Only  

```http
  GET /api/users
```

Send admin `Bearer ` token in the header

---
#### *Get user by id*
Description: Fetch a single users       
Access: Admin Only  

```http
  GET /api/users/:id
```

Send admin `Bearer ` token in the header

---
#### *Update a user*
Description: Update user   
Access: Admin Only  

```http
  PUT /api/users/:id
```
Send admin `Bearer ` token in the header 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Optional**. User name |
| `email` | `string` | **Optional**. User email |
| `password` | `string` | **Optional**. User password |


---
#### *Delete a user*
Description: Delete a user    
Access: Admin Only  

```http
  DELETE /api/users/:id
```
Send admin `Bearer ` token in the header 


## Tech Stack

**Client:** React, Redux, MaterializeCSS

**Server:** Node, Express

**Database:** Postgres -  [ElephantSQL](https://www.elephantsql.com/)


  
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
  
## License

[MIT](https://choosealicense.com/licenses/mit/)

  
## Support

For support, email msmahesh@live.com.

  
