import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import axios from "axios";

export const generatePDF = (pkg) => {
    return new Promise(async (resolve, reject) => {
        try {
            const filePath = path.join(
                process.cwd(),
                `package_${pkg.id}.pdf`
            );

            const doc = new PDFDocument();
            const writeStream = fs.createWriteStream(filePath);

            doc.pipe(writeStream);

            if (pkg.imageUrl) {
                const imageResponse = await axios.get(pkg.imageUrl, {
                    responseType: "arraybuffer",
                });

                const imageBuffer = Buffer.from(imageResponse.data);

                doc.image(imageBuffer, {
                    fit: [500, 300],
                    align: "center",
                });

                doc.moveDown();
            }

            doc.fontSize(20).text(pkg.title, { align: "center" });
            doc.moveDown();

            doc.fontSize(12).text(`Duration: ${pkg.duration} days`);
            doc.text(`Price: ₹${pkg.price}`);
            doc.moveDown();
            doc.text(pkg.description);

            doc.moveDown();
            doc.fontSize(14).text("TravelDay:");

            pkg.days.forEach((day) => {
                doc.moveDown();
                doc.fontSize(12).text(`Day ${day.dayNumber}: ${day.title}`);
                doc.text(day.description);
            });

            doc.end();

            writeStream.on("finish", () => resolve(filePath));
            writeStream.on("error", reject);

        } catch (error) {
            reject(error);
        }
    });
};
