# Meetopia

Meetopia is a Meetup clone built using React, JS, Sequelize, Redux, Express, and PostgreSQL. The website functions as a place for users to create events and meet others with similar interests. Currently, users are able to create and rsvp to events.

## Getting Started

To start setup of the project:

   npm install npm@latest -g
  
## Installation
- Clone the repo, or download the zip file from the repo

     git clone https://github.com/brendonwjames/Meetopia.git
     
- After downloading the repo, install dependencies in the root directory of the project.

    npm install (in the root directory of project)
    
- Create a .env file in the backend directory. Copy and paste all the info in the .env.example file into the .env file.

- Feel free to change the username, password, database name, port, and seucred characters for the JWT_SECRET found in the .env file.

- Create a PostgreSQL USER with CREATEDB and PASSWORD using the same information entered into your .env file.

      CREATE USER <username> WITH PASSWORD <'password'> CREATEDB;

- Create the Database, Migrate, and Seed files

    npm run db:setup
    
- Add the following proxy to your package.json file within your frontend directory, matching the port configuration from your .env file.

    "proxy": "http://localhost:5000"
    
- Start the backend server from the backend directory

    npm start (from backend directory)
    
- In a second terminal, start the frontend server from the frontend directory. If a default browser is not opened, navigate to http://localhost:3000/

    npm start (from frontend directory, in second terminal)
    
- Login as the Demo User, or create your own account to explore the current version of the site!
