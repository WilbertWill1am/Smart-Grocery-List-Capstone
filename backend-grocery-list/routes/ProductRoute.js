import express from "express";
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct, getProductByCategory } from "../controllers/ProductController.js";
import { verifyToken } from "../helpers/middleware.js";

const router = express.Router();
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.get("/products/category/:category", getProductByCategory);
router.post("/products", addProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
