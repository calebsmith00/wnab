## Introduction

This is a NextJS project bootstrapped with create-next-app. I wanted to create a budgeting app that myself and friends could use, so I am doing that by using YNAB as inspiration and TypeScript, React, and NodeJS for the logic and frontend.

This project is still in development, but I will update this README.md as more information becomes available. Until then, I will provide the necessary setup instructions to run this project locally.

## Setup Instructions

1. Install [NodeJS](https://nodejs.org/en/) and [Git](https://git-scm.com/)
2. Use the command line to navigate to where you'd like to clone the project (e.g: `cd c:\users\myself\documents`)
3. Clone the repository by typing `git clone https://github.com/calebsmith00/wnab.git`
4. Install the required modules by typing `npm install`
5. Configure the environment variables to match your own server configurations (should be setup at your own discretion):
```
DB_USER='postgres_database_user_name'
DB_HOST='postgres_database_host'
DB_PASS='postgres_database_pass'
DB_PORT=postgres_database_port
DB_NAME='postgres_database_name'
PW_SALT='uniqueSecretForSaltingUserAccounts'
JWT_SECRET='uniqueSecretForSigningJWTs'
```
6. Run the server by typing `npm run dev` into the command line
7. Visit the local server at [http://localhost:3000](http://localhost:3000)
