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

const app = express();
const port = process.env.PORT;

//ejs template engine
app.set("view engine", "ejs")

//static files middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//routes
app.get("*", checkUser)
app.use("/", pageRoute);
app.use("/photos", photoRoute)
app.use("/test", testRoute)
app.use("/users", userRoute)


app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
})
export default app;