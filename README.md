# Password-Manager

Web app that lets users signup and create password profiles letting users
store usernames and passwords on a MongoDB database.

## How is data stored?

User login passwords are salted and hashed and stored on a MongoDB database.
Hashing and user login authentication is done with bcrypt.

User passwords (excl. login passwords) are encrypted with a user provided or generated 32 char secret key allowing for decryption when it comes time for password retrieval. This encryption is done with the node crypto module using the aes-256-ctr algorithm. These passwords are also stored on a MongoDB database.

## Technologies used

NodeJS, and Express for server that is currently deployed on Heroku (may change in the future due to removal of free tier).
EJS and CSS to flesh out web pages.
Passport.js and express-session for session based auth along with ConnectMongo to create a session store on MongoDB.
Crypto for encryption and decryption.
Bcrypt for salting and hashing.
MongoDB used for storing data.

## How can I deploy my own setup?
#### Local setup
Clone and create a .env file.
In the .env, create 2 variables called DATABASE_URL and SESSION_SECRET.
Plug in your local MongoDB connection url into DATABASE_URL and a random string of characters for SESSION_SECRET.
> A local MongoDB connection url will look like this, mongodb://localhost/insert_db_name

#### Deployment w/ Heroku setup
Clone.
Create a cluster on MongoDB and whitelist 0.0.0.0/0. Then setup the connection and copy the connection url (database_url). 
Create app on Heroku.
Create an app on Heroku and follow the instructions to deploy it on Heroku.
Add the DATABASE_URL and SESSION_SECRET into the Config Vars in settings.
Restart heroku dynos just in case.
