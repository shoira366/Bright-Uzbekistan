import Joi from "joi";

const loginValidator = (schema: any) => (payload: any) =>
	schema.validate(payload, { abortEarly: false });

const LoginSchema = Joi.object({
	username: Joi.string().min(3).max(30).required(),
});

export default {
	validateLogin: loginValidator(LoginSchema),
};
