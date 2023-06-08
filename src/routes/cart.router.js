import { Router } from "express";
import CartManager from "../CartManager.js";
import ProductManager from "../ProductManager.js";

const router = Router()
let globalCart = new CartManager()
let products = new ProductManager()

router.post("/", (req, res) => {
    let newCart = new CartManager()
    res.send("Nuevo carrito creado")
})

router.get("/:cid", (req, res) => {
    let cartId = req.params.cid
    let cartFind = globalCart.getCartById(cartId)
    if (!cartId) {
        res.send("No se encontro el carrito")
        return
    } else {
        res.send(cartFind)
    }
})

router.post("/:cid/product/:pid", (req, res) => {
    let productId = req.params.pid
    let productFind = products.getProductById(productId)
    let cartId = req.params.cid
    let cartFind = globalCart.getCartById(cartId)
    cartFind.addToCart(productFind)
    res.send("Producto agregado")
})

export default router;