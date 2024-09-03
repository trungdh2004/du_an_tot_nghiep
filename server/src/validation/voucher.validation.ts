import Joi from "joi";

export const voucherValidation = Joi.object({
  name: Joi.string().required().messages({}),
  description: Joi.string().required().messages({}),
  startDate: Joi.string().required().messages({}),
  endDate: Joi.string().required().messages({}),
  discountType: Joi.number().required().messages({}),
  discountValue: Joi.number().required().messages({}),
  usageLimit: Joi.number().required().messages({}),
  minimumOrderValue: Joi.number().required().messages({}),
});
