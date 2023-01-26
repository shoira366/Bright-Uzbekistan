import { NextFunction, Request, Response } from "express";
import { CustomErrorHandler } from "../errors/errorHandler";
import AdminsModel from "../model/admins.model";
import CategoriesModel from "../model/categories.model";
import NewsModel from "../model/news.model";
import cloudinary from "../utils/cloudinary";
import moment from "moment";
moment.locale('uz-latn')

export default {
	GET: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { sdate, edate } = req.params;

			if (sdate && edate) {
				const searchNews = await NewsModel.find({
					start_date: { $gte: sdate, $lt: edate },
				});
			}else{
				const news = await NewsModel.find();

				return res.json({
					status: 200,
					data: news,
				})
			}

		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
	GET_SORTED: async (req: Request, res: Response, next: NextFunction) => {
		try {

			const {name} = req.params
			const news = await NewsModel.find()

			news.map((e: any) =>{
				const month = Number(moment(e.publication_date.date).format('M'))
				const year = moment(e.publication_date.date).format('YYYY')
			})
			

			const publicDate = await (await NewsModel.find()).filter(e => e.publication_date.date = `${e.publication_date.date}T${e.publication_date.time}`)

			const sortNews = publicDate.filter(obj => obj.publication_date.date = moment(obj.publication_date.date).startOf('hour').fromNow())

			sortNews.map((obj: any) =>{
				if(obj.publication_date.date.split(' ')[3] == 'kun' && Number(obj.publication_date.date.split(' ')[2]) <= 7){
                    // console.log(obj);
				}
			})
			const month = moment().month() + 1

			res.json(typeof month)
			

		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
	GET_BY_ADMIN: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const findNews = await NewsModel.find({
				admin: id,
			});

			return res.json({
				status: 200,
				data: findNews,
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
	POST: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const {
				news_header_uz,
				news_header_уз,
				news_header_ru,
				news_header_eng,
				short_desc_uz,
				short_desc_уз,
				short_desc_ru,
				short_desc_eng,
				image,
				content_uz,
				content_уз,
				content_ru,
				content_eng,
				time,
				date,
				tags_uz,
				tags_уз,
				tags_ru,
				tags_eng,
				categories,
				admin,
			} = req.body;

			const uploadedResponse = await cloudinary.v2.uploader.upload(
				image,
				{
					upload_preset: "news_image",
				}
			);			

			let obj = {
				id: "",
				url: "",
			};

			obj.id = uploadedResponse.public_id;
			obj.url = uploadedResponse.url;

			const News = new NewsModel({
				uz: {
					news_header: news_header_uz,
					short_desc: short_desc_uz,
					content: content_uz,
					tags: tags_uz,
				},
				уз: {
					news_header: news_header_уз,
					short_desc: short_desc_уз,
					content: content_уз,
					tags: tags_уз,
				},
				ru: {
					news_header: news_header_ru,
					short_desc: short_desc_ru,
					content: content_ru,
					tags: tags_ru,
				},
				eng: {
					news_header: news_header_eng,
					short_desc: short_desc_eng,
					content: content_eng,
					tags: tags_eng,
				},
				image: obj,
				publication_date: {
					time,
					date,
				},
				categories,
				admin,
			});

			categories.map(async (category: any) => {
				const findCategory = await CategoriesModel.findById(category);

				findCategory.news.push(News._id);

				await findCategory.save();
			});

			const findAdmin = await AdminsModel.findById(admin);
			findAdmin.news.push(News._id);
			await findAdmin.save();
			await News.save();

			console.log(News);

			return res.json({
				status: 200,
				message: "Added News",
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
	UPDATE_ONE: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const {
				news_header_uz,
				news_header_уз,
				news_header_ru,
				news_header_eng,
				short_desc_uz,
				short_desc_уз,
				short_desc_ru,
				short_desc_eng,
				image,
				content_uz,
				content_уз,
				content_ru,
				content_eng,
				time,
				date,
				tags_uz,
				tags_уз,
				tags_ru,
				tags_eng,
				categories,
			} = req.body;

			const findNews = await NewsModel.findById({
				_id: id,
			});

			let obj = {
				id: "",
				url: "",
			};

			if (req.body.image !== "") {
				const imageId = findNews.image.id;
				if (imageId) {
					await cloudinary.v2.uploader.destroy(imageId);
				}

				const newImage = await cloudinary.v2.uploader.upload(image, {
					upload_preset: "dev_setups",
				});

				obj.id = newImage.public_id;
				obj.url = newImage.url;
			}

			const data = {
				uz: {
					news_header: news_header_uz,
					short_desc: short_desc_uz,
					content: content_uz,
					tags: tags_uz,
				},
				уз: {
					news_header: news_header_уз,
					short_desc: short_desc_уз,
					content: content_уз,
					tags: tags_уз,
				},
				ru: {
					news_header: news_header_ru,
					short_desc: short_desc_ru,
					content: content_ru,
					tags: tags_ru,
				},
				eng: {
					news_header: news_header_eng,
					short_desc: short_desc_eng,
					content: content_eng,
					tags: tags_eng,
				},
				image: obj,
				publication_date: {
					time,
					date,
				},
				categories,
			};

			const newsUpdate = await NewsModel.findByIdAndUpdate(id, data);

			return res.json({
				status: 200,
				updated: newsUpdate,
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
	SEND_TO_CHECK: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id, sending, archive } = req.body;

			id.map(async (e: String) => {
				const data = {
					isSend: sending,
					isArchive: archive,
				};

				const updateNews = await NewsModel.findByIdAndUpdate(e, data);
			});

			return res.json({
				status: 200,
				message: "Change in news section",
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
	CONFIRM: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id, confirm } = req.body;

			id.map(async (e: any) => {
				const data = {
					isConfirmed: confirm,
				};

				await NewsModel.findByIdAndUpdate(e, data);
			});

			return res.json({
				status: 200,
				message: "Confirm section",
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
	DELETE: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.body;

			id.map(async (e: any) => {
				const findNews = await NewsModel.findById(e);

				const imageId = findNews.image.id;

				if (imageId) {
					await cloudinary.v2.uploader.destroy(imageId);
				}
			});

			await NewsModel.deleteMany({ _id: id });

			res.json({
				status: 200,
				message: "News has been successfully deleted",
			});
		} catch (err) {
			next(new CustomErrorHandler(err, 503));
		}
	},
};
