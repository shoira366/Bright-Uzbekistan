import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { CustomErrorHandler } from "../errors/errorHandler";
import AdminsModel from "../model/admins.model";
import RolesModel from "../model/roles.model";
import sendSms from "../utils/sendSms";
import CustomFunctionsModel from "../model/custom_functions.model";
import RegionsModel from "../model/regions.model";
import cloudinary from "../utils/cloudinary";

export default {
	GET: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const admins = await AdminsModel.find();

			return res.json({
				status: 200,
				data: admins,
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
	GET_BY_ID: async (req: Request, res: Response, next: NextFunction) => {
		try {
			
			const { id } = req.params

			const findAdmin = await AdminsModel.findById({ _id: id });

			return res.json({
				status: 200,
				data: findAdmin,
			});
			
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
	POST: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				avatar,
				fullname,
				education,
				login_password,
				phone_number,
				role,
				custom_functions,
				living_place,
			} = req.body;

			const uploadedResponse = await cloudinary.v2.uploader.upload(
				avatar,
				{
					upload_preset: "dev_setups",
				}
			);

			let obj = {
				id: "",
				url: "",
			};

			obj.id = uploadedResponse.public_id;
			obj.url = uploadedResponse.url;

			const newAdmin = new AdminsModel({
				user_avatar: obj,
				full_name: fullname,
				education,
				login_password,
				phone_number,
				role: role,
				custom_functions,
				living_place,
				created_at: Date.now(),
			});
			const message = `Your login password is ${login_password}`;

			// sendSms(phone_number, message);

			const findRoles = await RolesModel.findById({
				_id: role,
			});
			findRoles.admins.push(newAdmin._id);

			await findRoles.save();

			custom_functions.map(async (func: any) => {
				const findFunc = await CustomFunctionsModel.findById({
					_id: func,
				});

				findFunc.admins.push(newAdmin._id);

				await findFunc.save();
			});

			const findRegion = await RegionsModel.findById({
				_id: living_place,
			});

			findRegion.admins.push(newAdmin._id);
			await findRegion.save();
			await newAdmin.save();

			console.log(newAdmin);

			res.json({
				status: 200,
				data: newAdmin,
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
	PUT: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const {
				avatar,
				fullname,
				education,
				login_password,
				phone_number,
				role,
				custom_functions,
				living_place,
			} = req.body;

			const findAdmin = await AdminsModel.findById({
				_id: id,
			});

			let obj = {
				id: "",
				url: "",
			};

			if (req.body.avatar !== "") {
				const avatarId = findAdmin.user_avatar.id;
				if (avatarId) {
					await cloudinary.v2.uploader.destroy(avatarId);
				}

				const newAvatar = await cloudinary.v2.uploader.upload(avatar, {
					upload_preset: "dev_setups",
				});

				obj.id = newAvatar.public_id;
				obj.url = newAvatar.url;
			}

			const data = {
				user_avatar: obj,
				full_name: fullname,
				education,
				login_password,
				phone_number,
				role,
				custom_functions,
				living_place,
			};

			const adminUpdate = await AdminsModel.findByIdAndUpdate(id, data);

			res.json({
				status: 200,
				updated: adminUpdate,
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
	DELETE: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const findAdmin = await AdminsModel.findById(id);

			const avatarId = findAdmin.user_avatar.id;

			if (avatarId) {
				await cloudinary.v2.uploader.destroy(avatarId);
			}

			await AdminsModel.findByIdAndDelete(id);

			res.json({
				status: 200,
				message: "Admin has been removed",
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
};
