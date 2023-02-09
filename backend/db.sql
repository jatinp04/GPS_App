Devices 
1.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

2.
create table devices (
    devices_uuid uuid DEFAULT uuid_generate_v4() unique not null,
    devices_id  text unique not null,
    device_type text not null,
    latest_timestamp timestamp not null,
    latest_location text not null
);


insert into devices(devices_id , device_type , latest_location) values ('D-1568','Aircraft', 'L3');

sorting 

select * from devices order by devices_id asc;


//pagination

 select * from devices limit 5;

 select * from devices limit 5 offset 5;


 4.  DB Start 
 net start postgresql-9.6



--  User Creation for Login

1. create database users;
2 \c users --for selecting Db
3 create table users
(user_id uuid primary key not null unique DEFAULT, name varchar(200) not null , email varchar(200) not null ,password varchar(200) not null , unique(email)); 


create table users (
    user_id uuid DEFAULT uuid_generate_v4() unique not null,
    email  text unique not null,
    password text not null,
    authToken text not null
);


//EXport DB database

pg_dump -p 5000 -U postgres gpspensieve  > dbexport.pgsql --> -p 5000 is given because default port has been changed

// Start NGRok service 

ngrok tcp 5000
