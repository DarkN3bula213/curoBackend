import express from "express";
import newItem from "./newItem";
import updateItem from "./updateItem";
import removeItem from "./removeItem";
import fetch from "./fetch";
const router = express.Router();

router.use("/new", newItem);
router.use("/update", updateItem);
router.use("/remove", removeItem);
router.use("/fetch", fetch);

export default router;
