import Joi from "joi";

export const sizeValidation = Joi.object({
  name: Joi.string().required().messages({}),
  code: Joi.string().required().messages({}),
});

export const colorValidation = Joi.object({
  name: Joi.string().required().messages({}),
  code: Joi.string().required().messages({}),
});
export const categoryValidation = Joi.object({
  name: Joi.string().required().messages({}),
  description: Joi.string().required().messages({}),
});

export const productValidations = Joi.object({
  name: Joi.string().required().messages({}),
  price: Joi.number().required().messages({}),
  discount: Joi.number().required().messages({}),
  description: Joi.string().required().messages({}),
  thumbnail: Joi.string().required().messages({}),
  category: Joi.string().required().messages({}),
  images: Joi.array().items(
    Joi.object({
      url: Joi.string().required().messages({}),
    })
  ),
  attributes: Joi.array().items(Joi.string().required().messages({})),
});
