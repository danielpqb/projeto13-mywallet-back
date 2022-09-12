import joi from "joi";

const createUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const validateUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const createTransactionSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
});

export { createUserSchema, validateUserSchema, createTransactionSchema };
