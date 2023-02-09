import express from "express";
import dotenv from "dotenv"
import dbConnect from "./db.js";
import pageRoute from "./routes/pageRoute.js"
import photoRoute from "./routes/photoRoute.js"
import testRoute from "./routes/testRoute.js"
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
import { checkUser } from "./middlewares/authMiddleware.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary} from "cloudinary";


dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

//connetcion to the db
dbConnect();

const app = express();
const port = process.env.PORT;

//ejs template engine
app.set("view engine", "ejs")

//static files middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({useTempFiles: true}))


//routes
app.use("*", checkUser)
app.use("/", pageRoute);
app.use("/photos", photoRoute)
app.use("/test", testRoute)
app.use("/users", userRoute)


app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
})