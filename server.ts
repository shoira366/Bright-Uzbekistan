import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
import { connection as mongo } from "./src/config/mongo";
import route from "./src/routes/routes";

const app: Application = express();
const PORT = 8080 || process.env.PORT;

mongo()
	.then(() => console.log("Connected MongoDB"))
	.catch((err) => console.log(err));

app.use(cors());
app.use(express.json({
	limit: '50mb'
}));
app.use("/", route);

app.use("/*", (_, res) => res.sendStatus(404));

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
