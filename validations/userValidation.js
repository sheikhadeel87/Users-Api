import Joi from 'joi';

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
  password: Joi.string().min(6)
}).or('name', 'email', 'password');

export { registerSchema, loginSchema, updateSchema };

