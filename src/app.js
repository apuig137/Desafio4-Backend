import express from "express";
import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/products.router.js";
import homeRouter from "./routes/home.router.js"
import realTimeProductsRouter from "./routes/realTimeProducts.router.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import {Server} from "socket.io"

const app = express()

app.use(express.static(__dirname + '/public'))

app.engine("handlebars", handlebars.engine())
app.set("views",__dirname+"/views")
app.set("view engine","handlebars")

app.use(express.json())
app.use("/api/products/",productsRouter)
app.use("/api/carts/", cartRouter)
app.use("/realtimeproducts", realTimeProductsRouter)
app.use("/", homeRouter)

const httpServer = app.listen(8080,() => console.log("Servidor arriba en el puerto 8080"))

const socketServer = new Server(httpServer)

socketServer.on("connection", socket => {
    console.log("Nuevo cliente conectado en realTimeProducts", socket.id)
    socket.on("product", (data) => {
        console.log(data)
    })
})
