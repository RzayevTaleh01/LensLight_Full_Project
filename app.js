import express from "express";
import dotenv from "dotenv"
import dbConnect from "./db.js";
import pageRoute from "./routes/pageRoute.js"
import photoRoute from "./routes/photoRoute.js"
import testRoute from "./routes/testRoute.js"
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
import { checkUser } from "./middlewares/authMiddleware.js";


dotenv.config();

//connetcion to the db
dbConnect();

const index = express();
const port = process.env.PORT;

//ejs template engine
index.set("view engine", "ejs")

//static files middleware
index.use(express.static("public"));
index.use(express.json());
index.use(express.urlencoded({ extended: true }));
index.use(cookieParser());


//routes
index.get("*", checkUser)
index.use("/", pageRoute);
index.use("/photos", photoRoute)
index.use("/test", testRoute)
index.use("/users", userRoute)


index.listen(port, () => {
    console.log(`Application running on port: ${port}`);
})
export default app;