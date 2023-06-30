import mongoose from "mongoose";

const productCollection = "products"

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    code:{
        type: Number,
        require: true,
        unique: true
    },
    stock:{
        type: Number,
        require: true
    },
    quantity:{
        type: Number,
        require: true
    },
    thumbnail: String
})

export const productModel = mongoose.model(productCollection, productSchema)