import mongoose, { Schema } from "mongoose";

const Regions = new mongoose.Schema({
	region_name: {
		type: String,
		required: true,
	},
	admins: [
		{
			type: Schema.Types.ObjectId,
			ref: "admins",
		},
	],
});

const RegionsModel = mongoose.model("regions", Regions);

export default RegionsModel;
