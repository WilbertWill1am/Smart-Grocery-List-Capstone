import express from "express";
import { getAllList, createList, getListId, deleteList, getListByUserId } from "../controllers/ListController.js";
import { verifyToken } from "../helpers/middleware.js";

const router = express.Router();

router.get("/list", getAllList);
router.get("/list/:id", getListId);
router.get("/list/users/:id", getListByUserId);
router.post("/list", createList);
router.delete("/list/:id", deleteList);

export default router;
