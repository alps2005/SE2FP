import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(()=>{
    console.log("Base de datos conectada correctamente.")
    app.listen(PORT, ()=>{
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch((error)=> console.log(error));

app.use("/api", route);