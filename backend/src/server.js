import express from "express";
import dotenv from "dotenv";
dotenv.config();
import adminRoutes from "./routes/admin.route.js";
import packageRoutes from "./routes/package.route.js";
import { errorHandler } from "./middleware/error.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/package", packageRoutes);

app.use(errorHandler);


app.listen(5000, () => {
    console.log("Server is running on port 5000");
})