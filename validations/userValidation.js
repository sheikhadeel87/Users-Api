import Joi from 'joi';

// joi is like a validator for the data that is coming in from the client.
// like input fields username,password ,valid email,valid age,valid website,valid bio,etc.

const profileSchema = Joi.object({
  bio: Joi.string().trim().max(200),
  age: Joi.number().integer().min(0),
  website: Joi.string().uri()
});

const registerSchema = Joi.object({
  name: Joi.string().trim().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const updateSchema = Joi.object({
  name: Joi.string().trim().min(1),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  profile: profileSchema
}).or('name', 'email', 'password', 'profile');

export { registerSchema, loginSchema, updateSchema };


