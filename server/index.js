import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.routes.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js"
import cors from "cors";
const app = express();

dotenv.config({});
connectDB();

const PORT = process.env.PORT || 3000 ;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/v1/media" , mediaRoute);
app.use("/api/v1/user" , userRoute);
app.use("/api/v1/course" , courseRoute);
app.use("/api/v1/purchase" , purchaseRoute);
app.use("/api/v1/progress" , courseProgressRoute);

app.listen(PORT ,()=>{
    console.log(`app is listening on port ${PORT}`)
})                                          