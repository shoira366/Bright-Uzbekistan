import { NextFunction, Request, Response } from "express";
import { CustomErrorHandler } from "../errors/errorHandler";
import CustomFunctionsModel from "../model/custom_functions.model";

export default {
	GET: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const roles = await CustomFunctionsModel.find();
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
			const { title } = req.body;

			const newFunction = new CustomFunctionsModel({
				title
			});

			await newFunction.save();

			res.json({
				status: 200,
				message: "Added new custom-function",
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
};