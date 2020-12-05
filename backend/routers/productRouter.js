import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async(req, res)=>{
    const products = await Product.find({});
    res.send(products);
}));
productRouter.get('/seed', expressAsyncHandler(async(req, res)=>{
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts});
}));
productRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message: 'Prekė nerasta'});
    }
}));

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async(req, res)=>{
    const product = new Product({
        name:'Naujas medelis',
        image:'/images/p2.png',
        price: 0,
        category: 'Kategorija',
        type: 'tipas',
        countInStock:0,
        rating:0,
        numReviews:0,
        description:'Aprašymas',
    });
    const createdProduct = await product.save();
    res.send({message:'Prekė sukurta', product: createdProduct})
}))
export default productRouter;