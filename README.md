
# GPS App

Gps app which shows the data of the GPS devices with it's Device type, Device Location and the Timestamp.

Video Demo: 









## Languages and Technologies used

1. Frontend : React.JS

2. Backend : Node.JS

3. Frontend & Backend communicate through REST APIs.

4. Database: Psql (An RDBMS that uses SQL)

## Prerequisites

1. Install Psql database.
2. Install Node.js
2. Any Editor (Preferably VS Code)
3. Any web browser with latest version.
4. Database File. Download from here :https://rb.gy/mprmjh

## Configure the Database 
1. Open the Psql CLI

2. Create a Database 
```bash
CREATE DATABASE GPS
```
2. Import the file which you have downlaoded earlier 

```bash
sudo -u postgres psql DATABASE_NAME < 'file_path'
```


#








## Steps to Run the Project  Locally

Clone the project

```bash
git clone https://github.com/jatinp04/GPS_App
```

Go to the project directory

```bash
cd GPS_App
```

Install dependencies

```bash
npm install
```

### Configuring the authservice.JS

Navigate to authService.js in the ```backend``` Folder under ```services``` folder.

1. Replace the ```user``` with your postgres username
2. Port with your default ```port``` that postgres is runnig on default will be 5432
3. Replace the database field with  the database file in the imported previous step 

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

1. Create a ```.env``` file in the ```backend``` folder.
2. Replace the DB_KEY with your Database Password.

```
BACKEND_PORT=7000
JWT_SECRET=abcdefghijkl
DB_KEY=<DATABASE_PASSWORD>
```
Navigate to Backend folder 

```bash
cd backend
```


Start the server : Backend


```bash
nodemon
```

Open a Seprate Terminal and Start the Frontend server
```bash
cd frontend

npm run start
``` 

