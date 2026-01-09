import { cloudinary } from "../config/cloudinary.js";
import prisma from "../config/prisma.js";
import { generatePDF } from "../utils/pdfGenerator.js";
import streamifier from "streamifier";


export const createPackage = async (req, res, next) => {
    try {
        const { title, description, price, duration, days } = req.body;

        if (!title || !description || !price || !duration || !days) {
            const err = new Error("All fields are required");
            err.statusCode = 400;
            throw err;
        }

        const parsedDays = JSON.parse(days);
        if (parsedDays.length !== Number(duration)) {
            const err = new Error("Duration should match number of days");
            err.statusCode = 400;
            throw err;
        }

        if (!req.file) {
            const err = new Error("Image file is required");
            err.statusCode = 400;
            throw err;
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if(!allowedTypes.includes(req.file.mimetype)){
            const err = new Error("Only JPG and PNG files are allowed");
            err.statusCode = 400;
            throw err;
        };

        const uploadToCloudinary = (buffer) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(
                    `data:image/jpeg;base64,${buffer.toString("base64")}`, // convert buffer into base64 string
                    {
                        folder: "travel-packages",
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
            });
        };


        const result = await uploadToCloudinary(req.file.buffer);


        const pkg = await prisma.package.create({
            data: {
                title,
                description,
                duration: Number(duration),
                price: Number(price),
                imageUrl: result.secure_url,
                days: {
                    create: parsedDays.map((day) => ({
                        dayNumber: day.dayNumber,
                        title: day.title,
                        description: day.description,
                    })),
                },
            },
            include: {days: true},
        });

        res.status(201).json({success: true, data: pkg});


    } catch (error) {
        next(error);
    }
};

export const getAllPackages = async(req, res, next) => {
    try {
        const packages = await prisma.package.findMany({
            include: {days: true},
        });

        if(!packages){
            const err = new Error("No packages Available");
            err.statusCode = 400;
            throw err;
        };

        res.json({success: true, data: packages});
    } catch (error) {
        next(error);
    }
};

export const getOnePackage = async(req, res, next) => {
    try {
        const pkg = await prisma.package.findUnique({
            where: {id: Number(req.params.id)},
            include: {days: true},
        });

        if(!pkg){
            const err = new Error("Packages not Found");
            err.statusCode = 404;
            throw err;
        }

        res.json({success: true, data :pkg});
    } catch (error) {
        next(error);
    }
};

export const deletePackage = async (req, res, next) => {
    try {
        await prisma.package.delete({
            where: {id: Number(req.params.id)},
        });
        res.json({ success: true, message: "Package deleted" });

    } catch (error) {
        next(error);
    }
};

export const downloadPdf = async (req, res, next) => {
    try {
        const pkg = await prisma.package.findUnique({
            where: {id: Number(req.params.id)},
            include: {days: true},
        });

        if(!pkg){
            const err = new Error("Package not found");
            err.statusCode = 404;
            throw err;
        };

        const path = await generatePDF(pkg);
        res.download(path);
    } catch (error) {
        next(error);
    }
}
