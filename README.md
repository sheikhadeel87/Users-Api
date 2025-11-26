
# USERS API 

A simple and clean RESTful **USERS API** built using **NODE.js,Express,MongoDB and JWT Authentication** .

---

- This application includes:

- Users Registration

- Users Login 

- JWT Authentication 

- CRUD on Users Profile 

- Data validation from Joi

- MongoDB connection using Mongoose

---
---

## Features

1. Users Registration(POST)
 - name,email,password
2. Users Login(POST)
 - email,password
3. Get Current User Profile(GET + Auth)
 - current users Id + Auth Token
4. Get All Users Profile(GET + Auth)
 - current users AuthToken
5. Update User Profile(PUT/PATCH)
 - user can only update his/her profile name,email
6. Delete User profile(DELETE + Auth)
 - Auth Token required
7. Protect Routes using JWT
8. Validation for all requests

---
## Validations

- name min(3) characters
- email must follow format like (abc12@example.com)
- password min(6) values

---

---

## Installation

- Write this code in Terminal
- `Git clone <https://github.com/sheikhadeel87/Users-Api>`
- `cd  USERS API`
- `npm install`

---

## Environment VAriables 

- Create .env file:
- setUp the file

---

---

## Run the Server

`npm start` 

- or

`node server.js`

- server will run at:

> http://localhost:5001

---

---

## 📂 API Documentation 
   
> ### Register User
>
 >>**POST** /api/auth/register

> ### Login User
>
 >>**POST** /api/auth/login

> ### Get Current Users Profile
>
 >> **GET** /api/users/me

> ### Get All Users Profile(Protected)
>
 >> **GET** /api/users

> ### Update Users Profile(Protected) 
> 
 >> **PUT/PATCH** /api/users/id: 

> ### Delete User(Protected)
>
 >> **DELETE** /api/users/id:



---

---

## 🧠 Testing with Postman

1. Import your Postman collection

2. Test Register & Login

3. Copy token from Login

4. Add it to Authorization → Bearer Token

5. Test protected routes

---

---

### Tech Stack
 
 - Node.js
  
 - Express.js

 - MosgoDB & Mongoose

 - JWT Authentication

 - Joi Validation

---



