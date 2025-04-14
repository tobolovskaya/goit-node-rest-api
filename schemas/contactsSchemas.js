import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(1).max(255).required(),
    phone: Joi.string().min(1).max(255).required(),
})

export const updateContactSchema = Joi.object({
    name: Joi.string().min(1).max(255),
    email: Joi.string().min(1).max(255),
    phone: Joi.string().min(1).max(255),
}).min(1);