import Joi from "joi";

export const sizeValidation = Joi.object({
  name: Joi.string().required().messages({}),
  code: Joi.number().required().messages({}),
});

export const colorValidation = Joi.object({
  name: Joi.string().required().messages({}),
  code: Joi.number().required().messages({}),
});
export const categoryValidation = Joi.object({
  name: Joi.string().required().messages({}),
  description: Joi.string().required().messages({}),
});
