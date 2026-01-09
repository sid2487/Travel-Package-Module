# Travel Package Module

A full-stack Travel Package Module where an admin can create travel packages with images and day-wise itineraries, and users can view package details and download them as a PDF.
---

## Features

### Admin
- Create travel packages
- Upload package cover image
- Add dynamic day-wise itinerary
- Store images using Cloudinary

### User
- View all travel packages
- View single package details
- Download package details as PDF

---

## Tech Stack

### Backend
- Node.js
- Express.js
- Prisma ORM
- MySQL
- Multer (memory storage)
- Cloudinary
- PDFKit

### Frontend
- React
- Axios
- Tailwind CSS

---

## Project Structure

### Backend

backend/
├── prisma/
│ └── schema.prisma
├── src/
│ ├── server.js
│ ├── prisma.js
│ ├── config/
│ │ └── cloudinary.js
│ ├── routes/
│ │ ├── admin.routes.js
│ │ └── package.routes.js
│ ├── controllers/
│ │ └── package.controller.js
│ ├── middleware/
│ │ └── error.middleware.js
│ └── utils/
│ └── pdfGenerator.js
└── .env

### Frontend

frontend/
├── src/
│ ├── api/
│ │ ├── axios.js
│ │ └── packageApi.js
│ ├── components/
│ │ ├── CreatePackage.jsx
│ │ ├── PackageList.jsx
│ │ └── PackageDetails.jsx
│ ├── App.js
│ ├── index.js
│ └── index.css
└── tailwind.config.js


## API Endpoints

### Admin APIs
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/admin/packages` | Create a new package |

### User APIs
| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/package/packages` | Get all packages |
| GET | `/package/pcakages/:id` | Get single package |
| GET | `/package/pcakages/:id/pdf` | Download package PDF |

## PDF Generation

- PDFs are generated dynamically using PDFKit
- Includes:
  - Package title
  - Description
  - Price
  - Duration
  - Day-wise itinerary
- PDF is downloaded directly by the browser

  Running the Project:
  cd backend
  npm install
  npx prisma migrate dev
  npm run dev

  Frontend
  cd frontend
  npm install
  npm start

