## About The Project

Project : Store Store application. There are features such as CRUD products,CURD User,CRUD Order.

### Built With

* Nodejs Express

## Getting Started
- git clone https://github.com/casterpin2/FE_Store.git
- `npm install` to install npm package
- Create database with SQL Shell 
    `CREATE DATABASE store;` for dev
    `CREATE DATABASE store_test;` for dev
- Create User
    `CREATE USER tuyennn WITH PASSWORD '123456'`
- Grant database dev and for new user
    `\c store`
    `GRANT ALL PRIVILEGES ON DATABASE store TO tuyennn;`
    `\c store_test`
    `GRANT ALL PRIVILEGES ON DATABASE store_test TO tuyennn;`
- Create file .env follow   
    POSTGRES_HOST=localhost 
    POSTGRES_DB=store
    POSTGRES_USER=tuyennn 
    POSTGRES_PASSWORD=123456 
    POSTGRES_DB_TEST=store_test 
    NODE_ENV=dev 
    POSTGRES_DB_PORT=5432
    #Bcrypy
    BCRYPT_PASSWORD=joker 
    SALT_ROUNDS=10

    #JWT_CREDENTIAL
    ACCESS_TOKEN_SECRET = Access_Token_Secret_#$%_BE_STORE_Authentication
    ACCESS_TOKEN_LIFE = 10m 
    `POSTGRES_DB_PORT` is default 5432
## Migrate Database
- Run `npm run db-up` mirgate for db dev
- Run `npm run db-down`rest migrate for db dev
- Run `npm run test-up` for db test

## Run Project
- Run `npm run start` run project with port 3000
## Test and Build
- Run `npm run buid` build project

- Run `npm run test` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running prettier
- Run `npm run prettier` check all development code by prettier in app project.

## Run Lint
- Run `npm run lint` to execute the Eslint
## ENV
- You can change the port to match the postgres db settings (.env file)
##### Usage PostMan
- http://localhost:3000/user/create - Create user.
- http://localhost:3000/user/login - login unser.
- http://localhost:3000/user/show - show all user.
- http://localhost:3000/user/index - get current user with token.
- http://localhost:3000/product/create -create product.
- http://localhost:3000/product/show - show all product.
- http://localhost:3000/product/index/:id - get detail product (:id- id of product).
- http://localhost:3000/order/create - create order.
- http://localhost:3000/order/detail -detail order with user token.
###### Contact
TuyenNN - tuyennn0209@gmail.com
