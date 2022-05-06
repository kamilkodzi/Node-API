# How to install loggerApp

#### Download project with pul request from github repository:

> gh repo clone kamilkodzi/Node-API

#### Install required dependencies with command:

> npm install

#### Install MySQL server (database) on your computer.

#### Add new file to root directory of this project .env then add 5 lines inside:

DB_MYSQL_HOST=localhost  
DB_MYSQL_DATABASE=uzupełnić  
DB_MYSQL_USER=uzupełnić  
DB_MYSQL_PASS=uzupełnić  
SECRET_SESSION_ID=uzupełnić

#### Create tables and insert test data inside your project with commands:

> knex migrate:latest  
> knex seed:run

#### Finally run project with:

> npm run dev
daniel tu był