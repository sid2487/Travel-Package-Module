import express from "express";
import dotenv from "dotenv";
dotenv.config();
import adminRoutes from "./routes/admin.route.js";
import packageRoutes from "./routes/package.route.js";
import { errorHandler } from "./middleware/error.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://travel-package-module.vercel.app"
    ], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/package", packageRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})