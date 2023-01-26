import { NextFunction, Request, Response } from "express";
import { CustomErrorHandler } from "../errors/errorHandler";
import RolesModel from "../model/roles.model";

export default {
	GET_BY_ID: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const findRole = await RolesModel.findOne({ _id: id });

			return res.json({
				status: 200,
				data: findRole,
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
	GET: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const roles = await RolesModel.find();
			res.json({
				status: 200,
				data: roles,
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
	POST: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { title, description } = req.body;

			const newRole = new RolesModel({
				title,
				desc: description,
			});

			await newRole.save();

			res.json({
				status: 200,
				message: "Added new role",
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
};
