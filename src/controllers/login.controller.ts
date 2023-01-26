import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import AdminModel from "../model/admins.model";
import validator from "../utils/validations/login.validation";
import jwt from "../utils/jwt";
import { CustomErrorHandler } from "../errors/errorHandler";

export default {
	LOGIN: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { username } = req.body;
			const { error, value } = validator.validateLogin(req.body);

			if (error) {
				console.log(error, value);

				return res.send(error.details);
			}

			const foundAdmin = await AdminModel.findOne({
				login_password: username,
			});

			if(!foundAdmin){
               return res.json({
				status: 401,
				message: "Unauthorized",
			});
			}

			const token = jwt.sign({
				role: foundAdmin.role,
				id: foundAdmin.id
			});

			if (foundAdmin) {
				return res.json({
					status: 200,
					access_token: token,
					role: foundAdmin.role,
				});
			}

		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
};
