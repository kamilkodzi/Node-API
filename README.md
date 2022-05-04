#How to install loggerApp
Download project with pul request from github repository:

> kamil:tbd(add a terminal command)

Install required dependencies with command:

> npm install

Baza danych - zainstalowany serwer mySQL
dodanie plikiu .env do głównego katalogu z zawartością:
DB_MYSQL_HOST=localhost
DB_MYSQL_DATABASE=uzupełnić
DB_MYSQL_USER=uzupełnić
DB_MYSQL_PASS=uzupełnić
SECRET_SESSION_ID=uzupełnić

kolejno komendy w terminalu by utworzyć tabele w bazie i dodac dane testowe:
knex migrate:latest
knex seed:run

na końcu:
npm run dev
