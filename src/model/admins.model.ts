import mongoose, { Schema } from "mongoose";

const AdminSchema = new mongoose.Schema({
	user_avatar: {
		type: { id: String, url: String },
		required: true,
	},
	full_name: {
		type: String,
		required: true,
	},
	education: {
		type: String,
		required: true,
	},
	login_password: {
		type: String,
		required: true,
		uppercase: true,
		unique: true
	},
	phone_number: {
		type: String,
		unique: true,
		required: true,
	},
	role:
		{
			type: Schema.Types.ObjectId,
			ref: "roles",
		},
	custom_functions: [
		{
			type: Schema.Types.ObjectId,
			ref: "custom_functions",
		},
	],
	living_place: {
		type: Schema.Types.ObjectId,
		ref: "regions",
	},
	news: [
		{
			type: Schema.Types.ObjectId,
			ref: 'news'
		}
	],
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const AdminsModel = mongoose.model("admins", AdminSchema);

export default AdminsModel;
