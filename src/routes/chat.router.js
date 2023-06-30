import { Router } from "express";
import { messageModel } from "../dao/models/message.model.js";

const router = Router()

router.get("/", async (req, res) => {
    let messages = await messageModel.find()
    res.render("chat", { messages: messages })
})

export default router