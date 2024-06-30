create database assesment;

use assesment;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    name VARCHAR(255) NOT NULL
);



data was sent on regestaration:
{
    "name":"Kaustubh Ganorkar",
    "dob":"2000-13-13",
    "password":"mypassword",
    "confirm_password":"mypassword",
    "email":"kaustubhganorkar@gmail.com"
}

data recieved as response:
{
    "status": true,
    "message": "User Registration Successful",
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 2,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}


data send o Login:
{
    "email":"kaustubhganorkar@gmail.com",
    "password":"mypassword"
}

data recieved on login:
{
    "status": true,
    "message": "User Login Successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMzAzMTczMCwiZXhwIjoxNzIwODA3NzMwfQ.wAaQr7pjEg3Fx-_Y5elSppVz-qQsONI2ntQBs6i0ww8",
    "data": {
        "id": 1,
        "email": "kaustubhganorkar@gmail.com",
        "dob": "2000-12-12",
        "name": "Kaustubh Ganorkar"
    }
}


email : shreyasawarkar@gmail.com
password: Shreya@123