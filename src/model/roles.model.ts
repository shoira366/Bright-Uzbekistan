import mongoose, { Schema } from "mongoose";

const RolesSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	desc: {
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

const RolesModel = mongoose.model("roles", RolesSchema);

export default RolesModel;
