import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router()

let products = new ProductManager()
let jamon = {title: "Jamon natural", description: "Jamon natural embasado al vacio de 150grs", price: 3500, thumbnail: "url foto", code: "abc123", quantity: 0, stock: 20}
products.addProduct(jamon)
let queso = {title: "Queso Dambo", description: "Pedaso de queso Dambo embaso con un peso de 300grs", price: 3500, thumbnail: "url foto", code: "abc124", quantity: 0, stock: 20}
products.addProduct(queso)
let pan = {title: "Pan", description: "Baguette de pan frances", price: 400, thumbnail: "url foto", code: "abc125", quantity: 0, stock: 20}
products.addProduct(pan)
let productsList = products.getProducts()

router.get("/", (req, res) => {
    let limit = req.query.limit
    if (!limit) {
        res.send(productsList)
    } else if (limit > productsList.length || limit < 1) {
        res.send(`Cantidad invalida, por favor ingresar un numero entre 1 y ${productsList.length}`)
    } else {
        let limitedProducts = []
        for (let index = 0; index < limit; index++) {
            limitedProducts.push(productsList[index])
        }
        res.send(limitedProducts)
    }
})

router.get("/:id", (req, res) => {
    let productId = req.params.id
    let findProduct = productsList.find(p => p.id === parseInt(productId))
    if (!productId) { 
        res.send(productsList) 
    } else {
        res.send(findProduct)
    }
})

router.post("/", (req, res) => {
    try {
        const newProduct = req.body
        products.addProduct(newProduct.title, newProduct.description, newProduct.price, newProduct.code, newProduct.stock, newProduct.thumnail,)
        res.status(201).send("Nuevo usuario añadido")
    } catch (error) {
        console.error(error)
    }
    
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const dataToUpdate = req.body;
    const product = products.getProductById(id)
    if(!product){
        res.status(404).send('Producto no encontrado');
        return
    }
    products.updateProduct(id, dataToUpdate.field, dataToUpdate.value)
    res.send({ product });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const product = products.getProductById(id)
    if(!product){
        res.status(404).send('Producto no encontrado');
        return
    }
    products.deleteProduct(id)
    res.send({ status: 'success', product });
});

export default router;
