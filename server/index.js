import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors";

const app = express();

// Load environment variables first
dotenv.config();

// Middleware - order matters!
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes - this is the key fix!
app.use("/api/users", route);  // Changed from "/api" to "/api/users"

// Test route to verify server is working
app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!', port: PORT });
});

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(()=>{
    console.log("Base de datos conectada correctamente.")
    app.listen(PORT, ()=>{
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch((error)=> console.log(error));