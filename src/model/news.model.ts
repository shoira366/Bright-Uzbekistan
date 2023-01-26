import mongoose, { DateExpression, mongo, Schema } from "mongoose";

const News = new mongoose.Schema({
	uz: {
		news_header: {
			type: String,
			required: true
		},
		short_desc: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		tags: {
			type: String,
			required: true
		}
	},
	уз: {
		news_header: {
			type: String,
			required: true
		},
		short_desc: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		tags: {
			type: String,
			required: true
		}
	},
	ru: {
		news_header: {
			type: String,
			required: true
		},
		short_desc: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		tags: {
			type: String,
			required: true
		}
	},
	eng: {
		news_header: {
			type: String,
			required: true
		},
		short_desc: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		tags: {
			type: String,
			required: true
		}
	},
	image: {
		type: { id: String, url: String },
		required: true,
	},
	publication_date: {
		time: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
	},
	categories: [
		{
			type: Schema.Types.ObjectId,
			ref: "categories",
		},
	],
	admin: {
		type: Schema.Types.ObjectId,
		ref: "admins",
	},
	isSend: {
        type: Boolean,
		default: false
	},
    isArchive: {
        type: Boolean,
        default: false
    },
	isConfirmed: {
        type: Boolean,
		default: false
	},
    isPublish: {
        type: Boolean,
        default: false
    }
});

const NewsModel = mongoose.model("news", News);

export default NewsModel;
