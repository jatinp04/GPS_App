# GPS App

Gps app which shows the data of the GPS devices with it's Device type, Device Location and the Timestamp.

Video Demo: https://youtu.be/0wt9Z4aC7dU

Webite Link :https://gpsfrontend.onrender.com/

## Languages and Technologies used

1. Frontend : React.JS

2. Backend : Node.JS

3. Frontend & Backend communicate through REST APIs.

4. Database: Psql (An RDBMS that uses SQL)

## Prerequisites

1. Install Psql database.
2. Install Node.js
3. Any Editor (Preferably VS Code)
4. Any web browser with latest version.
5. Database File. Download from here :https://rb.gy/mprmjh

## Configure the Database

1. Open the Psql CLI

2. Create a Database

```bash
CREATE DATABASE GPS
```

2. Import the file which you have downlaoded earlier

```bash
 psql DATABASE_NAME < 'file_path'
```

#

## Steps to Run the Project Locally

Clone the project

```bash
git clone https://github.com/jatinp04/GPS_App
```

Go to the project directory

```bash
cd GPS_App
```

Install dependencies on both backend and frontend folders.

```bash
npm install
```

### Configuring the authservice.JS

Navigate to authService.js in the `backend` Folder under `services` folder.

1. Replace the `user` with your postgres username
2. Port with your default `port` that postgres is runnig on default will be 5432
3. Replace the database field with the database file name in the imported in previous step

```bash
const pool = new Pool({
    user: "<username>",
    password: process.env.DB_KEY,
    // host: 5432,
    host: 'localhost',
    port:<PORT>,
    database: "<Database_name>",
});

```

### Create the .env file

1. Create a `.env` file in the `backend` folder.
2. Replace the DB_KEY with your Database Password.

```
BACKEND_PORT=7000
JWT_SECRET=abcdefghijkl
DB_KEY=<DATABASE_PASSWORD>
```

Navigate to Backend folder and start the server Backend

```bash
cd backend

nodemon

```

Open a Seprate Terminal and Start the Frontend server

```bash
cd frontend

npm run start
``` 

## Getting into the project:

This Project has been Developed using React for Frontend and Node.js for backend the database in use is Psql.

1. The Projects starts from the Login Page and user can also signup for the same if not registered.

![Login](https://user-images.githubusercontent.com/38129773/216619750-45d7c6b4-d086-4ef3-bcad-ed2586369135.png)

![Signup](https://user-images.githubusercontent.com/38129773/216619758-2b22e238-13e8-4b1c-afcf-8e0fcbdf7f83.png)

2. After Logging in the GPS Summary page opens and its shows the various parameters of a particular device such as `Device ID` `Device Type` `Lastest Timestamp` and it's `Latest Location`.

3. The user can also sort each of the properties by each field or can search by any of it's properties.
4. The user can also toggle pages accordingly by clicking on the top right of the table.

![HomePage](https://user-images.githubusercontent.com/38129773/216619782-ea2b2ee1-670a-479c-9973-13bb4b054a58.png)

5. By clicking on the ` →` present in the last column, which then navigates to the dashboard of the GPS Device with it's Timestamp and Location and a Pie-Chart which is based on the % of Location.

![Dashboard](https://user-images.githubusercontent.com/38129773/216619806-287bc100-23a7-4573-9a39-94289368b5f6.png)
