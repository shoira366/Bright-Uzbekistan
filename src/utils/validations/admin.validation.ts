import Joi from "joi";

const adminValidators = (schema: any) => (payload: any) => {
	schema.validate(payload, { abortEarly: false });
};


const AdminPostSchema = Joi.object({
    user_avatar: Joi.string()
})