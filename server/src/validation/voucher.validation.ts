import Joi from "joi";

export const voucherValidation = Joi.object({
  name: Joi.string().required().messages({}),
  description: Joi.string().required().messages({}),
  startDate: Joi.string().required().messages({}),
  endDate: Joi.string().required().messages({}),
  discountType: Joi.string().required().messages({}),
  discountValue: Joi.string().required().messages({}),
  usageLimit: Joi.string().required().messages({}),
});
