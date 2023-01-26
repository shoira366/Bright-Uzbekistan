import mongoose, { Schema } from "mongoose";

const CustomFunctions = new mongoose.Schema({
	title: {
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

const CustomFunctionsModel = mongoose.model(
	"custom_functions",
	CustomFunctions
);

export default CustomFunctionsModel;
