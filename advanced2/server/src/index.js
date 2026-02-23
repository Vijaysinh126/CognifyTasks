import express, { json } from "express"
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/auth.route.js"


const PORT = 8080 || process.env.PORT
dotenv.config({})
const app = express();


// middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cors())

// routes
app.use('/api/v1/user' , userRoute);

app.listen(PORT , () => {

    console.log(`server is running at PORT : ${PORT}`);
    connectDB();
})
