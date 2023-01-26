import mongoose, { Schema } from "mongoose";

const Categories = new mongoose.Schema({
	title: {
        type: String,
		required: true
	},
	news: [
		{
			type: Schema.Types.ObjectId,
			ref: "news",
		},
	],
});

const CategoriesModel = mongoose.model("categories", Categories);

export default CategoriesModel;
