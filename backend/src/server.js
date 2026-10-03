
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

const errorHandler = require("./middleware/errorHandler");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ShopSphere backend is running"
    });
});

// Product routes
app.use("/api/products", productRoutes);

// Error handling middleware (must be after routes)
app.use(errorHandler);

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`ShopSphere backend running on port ${PORT}`);
});