import { NextFunction, Request, Response } from "express";
import { CustomErrorHandler } from "../errors/errorHandler";
import RegionsModel from "../model/regions.model";

export default {
	GET: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const regions = await RegionsModel.find();
			res.json({
				status: 200,
				data: regions,
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
	POST: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { name } = req.body;

			const newRegion = new RegionsModel({
				region_name: name
			});

			await newRegion.save();

			res.json({
				status: 200,
				message: "Added new region",
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
};
