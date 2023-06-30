import express from "express";
import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/products.router.js";
import realTimeProductsRouter from "./routes/realTimeProducts.router.js"
import chatRouter from "./routes/chat.router.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js";
import {Server} from "socket.io"
import mongoose from "mongoose";
import { messageModel } from "./dao/models/message.model.js";

const app = express()
const MONGO = "mongodb+srv://apuig137:misiones2021@ecommerce.szekknh.mongodb.net/?retryWrites=true&w=majority"
const connection = mongoose.connect(MONGO)

app.use(express.static(__dirname + '/public'))

app.engine("handlebars", handlebars.engine())
app.set("views",__dirname+"/views")
app.set("view engine","handlebars")

app.use(express.json())
app.use("/api/products/",productsRouter)
app.use("/api/carts/", cartRouter)
app.use("/realtimeproducts", realTimeProductsRouter)
app.use("/chat", chatRouter)

const httpServer = app.listen(8080,() => console.log("Servidor arriba en el puerto 8080"))

const socketServer = new Server(httpServer)

socketServer.on("connection", async socket => {
    let messages = await messageModel.find()
    console.log("Nuevo cliente conectado en realTimeProducts", socket.id)
    socket.on("product", (data) => {
        console.log(data)
    })
    socket.on("message", async (data) => {
        await messageModel.create(data)
        socketServer.emit("messageLogs", messages)
    })
})
