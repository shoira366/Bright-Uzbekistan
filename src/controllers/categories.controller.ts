import { NextFunction, Request, Response } from "express";
import { CustomErrorHandler } from "../errors/errorHandler";
import CategoriesModel from "../model/categories.model";

export default {
	GET: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const categories = await CategoriesModel.find();

			return res.json({
				status: 200,
				data: categories,
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
	POST: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { title } = req.body;

            const newCategory = new CategoriesModel({title})

            await newCategory.save()

            return res.json({
                status: 200,
                message: 'Added new category'
            })

		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
};
