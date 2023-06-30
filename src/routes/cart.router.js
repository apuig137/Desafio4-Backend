import { Router } from "express";
import CartManager from "../dao/CartManager.js";
import { cartModel } from "../dao/models/cart.model.js";
import { productModel } from "../dao/models/product.model.js";
import ProductManager from "../dao/ProductManager.js"

const router = Router()
//let globalCart = new CartManager()
//let products = new ProductManager()

router.post("/", async (req, res) => {
    //let newCart = new CartManager()
    let newCart = await cartModel.create({})
    res.send("Nuevo carrito creado")
})

router.get("/:cid", async (req, res) => {
    //let cartId = req.params.cid
    //let cartFind = globalCart.getCartById(cartId)
    //if (!cartId) {
    //    res.send("No se encontro el carrito")
    //    return
    //} else {
    //    res.send(cartFind)
    //}
    let cartId = req.params.cid
    let cartFind = await cartModel.findOne({_id:cartId})
    if(!cartId){
        res.send("No se encontro el carrito")
    } else {
        res.send(cartFind)
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    //let productId = req.params.pid
    //let productFind = products.getProductById(productId)
    //let cartId = req.params.cid
    //let cartFind = globalCart.getCartById(cartId)
    //cartFind.addToCart(productFind)
    //res.send("Producto agregado")
    let productId = req.params.pid
    let productFind = await productModel.findOne({_id:productId})
    let cartId = req.params.cid
    let cartFind = await cartModel.findOne({_id:cartId})
    let array = cartFind.products
    array.push(productFind)
    res.send("Producto agregado")
})

export default router;