import { Router } from "express";
import { productModel } from "../dao/models/product.model.js";
import ProductManager from "../dao/ProductManager.js"

const router = Router()

let products = new ProductManager()
let jamon = {title: "Jamon natural", description: "Jamon natural embasado al vacio de 150grs", price: 3500, thumbnail: "url foto", code: "abc123", quantity: 0, stock: 20}
products.addProduct(jamon)
let queso = {title: "Queso Dambo", description: "Pedaso de queso Dambo embaso con un peso de 300grs", price: 3500, thumbnail: "url foto", code: "abc124", quantity: 0, stock: 20}
products.addProduct(queso)
let pan = {title: "Pan", description: "Baguette de pan frances", price: 400, thumbnail: "url foto", code: "abc125", quantity: 0, stock: 20}
products.addProduct(pan)
let productsList = products.getProducts()

router.get("/", async (req, res) => {
    let limit = req.query.limit
    let products = await productModel.find()
    let productsLength = await productModel.countDocuments()
    if (!limit) {
        res.send(products)
    } else if (limit > productsLength || limit < 1) {
        res.send(`Cantidad invalida, por favor ingresar un numero entre 1 y ${productsList.length}`)
    } else {
        let limitedProducts = await productModel.find({}).limit(limit)
        res.send(limitedProducts)
    }
})

router.get("/:id", async (req, res) => {
    let productId = req.params.id
    let findProduct = await productModel.findOne({_id:productId})
    let productsList = await productModel.find()
    if (!productId) { 
        res.send(productsList) 
    } else {
        res.send(findProduct)
    }
})

router.post("/", async(req, res) => {
    try {
        const {title, description, price, code, stock, quantity, thumbnail} = req.body
        let product = await productModel.create({
            title,
            description,
            price,
            code,
            stock,
            quantity,
            thumbnail
        })
        res.send({status:"succes",payload:product})
    } catch (error) {
        console.error(error)
    }
    
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const dataToUpdate = req.body;
    if(!dataToUpdate){
        res.status(404).send('Producto no encontrado');
        return
    }
    let result = await productModel.updateOne({_id:id}, dataToUpdate)
    res.send({status:"succes",payload:result});
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await productModel.deleteOne({_id:id})
    res.send({status:"succes",payload:result})
});

export default router;
