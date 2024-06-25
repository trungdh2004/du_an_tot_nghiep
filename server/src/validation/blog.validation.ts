import Joi from "joi";

export const TagsValidation = Joi.object({
    name: Joi.string().required().messages({}),
    description: Joi.string().required().messages({}),
  });
  