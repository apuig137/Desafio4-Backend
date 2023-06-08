import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router()
let products = new ProductManager()
let productsList = products.getProducts()

router.get("/", (req,res) => {
    res.render("home", { products: productsList })
})

export default router;