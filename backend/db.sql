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