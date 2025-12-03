
# USERS API 

A simple and clean RESTful **USERS API** built using **NODE.js,Express,MongoDB and JWT Authentication** .

---
###Part 1 - USER

- This application includes:

- Users Registration

- Users Login 

- JWT Authentication 

- CRUD on Users Profile 

- Data validation from Joi

- MongoDB connection using Mongoose

###Part 2 - USER NOTES

- Add new NOTES file which relates to USER(Add relationships (reference + nested))

- Creates Notes(if user already exists or logged In with JWT Token confirmation) 

- CRUD on Notes

---

## USER Features

1. Users Registration(POST)
 - name,email,password
2. Users Login(POST)
 - email,password
3. Get Current User Profile By ID(GET + Auth)
 - current users Id + Auth Token
4. Get All Users Profile(GET + Auth)
 - current users AuthToken
5. Update User Profile By ID(PUT/PATCH)
 - user can only update his/her profile name,email
6. Delete User profilBY ID(DELETE + Auth)
 - Auth Token required
7. Protect Routes using JWT
8. Validation for all requests

## Note Features

1. Create NOTES(POST)
 - title,content,tag,user
2. Get USER Notes by ID(GET + Auth)
 - current users Id + Auth Token
3. Get All User Notes (GET + Auth)
 - current user AuthToken(for Logged-in User)
4. User can update Notes(PUT/PATCH)
 - user can only update his/her title/content/tag only.
5. Deleted By ID(DELETE + Auth)
 - Auth Token required(user can delete his/her note)
6. Protect Routes using JWT
7. Validation for all requests
8. Each Note belongs to 1 User
9. A user can have many notes(Using Mongoose ref: "User")

---
## Validations

- name min(3) characters
- email must follow format like (abc12@example.com)
- password min(6) values

---

## Installation

- Write this code in Terminal
- `Git clone <https://github.com/sheikhadeel87/Users-Api>`
- `cd  USERS API`
- `npm install`

---

## Envirnment Variables 

- Create .env file:
- setUp the file

---

## Run the Server

`npm start` 

- or

`node server.js`

- server will run at:

> http://localhost:5001

---

## 📂 API Documentation For User
   
> ### Register User
>
 >>**POST** /api/auth/register

> ### Login User
>
 >>**POST** /api/auth/login

> ### Get Current Users Profile By ID
>
 >> **GET** /api/users/:id

> ### Get All Users Profile(Protected)
>
 >> **GET** /api/users

> ### Update Users Profile By ID(Protected) 
> 
 >> **PUT/PATCH** /api/users/:id

> ### Delete User By ID(Protected)
>
 >> **DELETE** /api/users/:id

 ---

 ## 📂 API Documentation For NOTES 
   
> ### CREATE New NOTES
>
 >>**POST** /api/notes

> ### Get Notes By Id
>
 >> **GET** /api/notes/:id

> ### Get All Notes(Protected)
>
 >> **GET** /api/notes

> ### Update Notes By ID(Protected) 
> 
 >> **PUT/PATCH** /api/notes/:id

> ### Delete Notes By ID(Protected)
>
 >> **DELETE** /api/notes/i:d


---

## 🧠 Testing with Postman

1. Import your Postman collection

2. Test Register & Login

3. Copy token from Login

4. Add it to Authorization → Bearer Token

5. Test protected routes

6. Test Sorting, filtering, pagination, search

---

### Tech Stack
 
 - Node.js
  
 - Express.js

 - MongoDB & Mongoose

 - JWT Authentication

 - Joi Validation

---







