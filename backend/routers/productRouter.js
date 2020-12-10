import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async(req, res)=>{
    const name = req.query.name || '';
    const nameFilter = name ? {name: {$regex: name, $options: 'i'}} : {};

    const products = await Product.find({...nameFilter});
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
        name:'Naujas medeli1'+Date.now(),
        image:'/images/p2.png',
        price: 100,
        category: 'Kategorija',
        type: 'tipas',
        countInStock:12,
        rating:0,
        numReviews:0,
        description:'Aprašymas',
    });
    const createdProduct = await product.save();
    res.send({message:'Prekė sukurta', product: createdProduct})
}));

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res)=>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){
        product.name = req.body.name;
        product.category = req.body.category;
        product.image = req.body.image;
        product.price = req.body.price;
        product.type = req.body.type;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({message:'Prekė atnaujinta', product: updatedProduct});
    }else{
        res.status(404).send({message: 'Prekė nerasta'});
    }
}));

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        const deleteProduct = await product.remove();
        res.send({message: 'Prekė pašalinta', product: deleteProduct});
       }else{
           res.status(404).send({message: 'Prekė nerasta'});
       }
}));

productRouter.post('/:id/reviews', isAuth, expressAsyncHandler(async(req, res)=>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){
        if(product.reviews.find(x=> x.name === req.user.nick))
        {
            res.status(400).send({message: 'Jūs jau palikote įvertinimą'})
        }
       const review = {name: req.user.nick, rating: Number(req.body.rating), comment: req.body.comment};
       product.reviews.push(review);
       product.numReviews = product.reviews.length;
       product.rating = product.reviews.reduce((a,c)=> c.rating + a, 0)/product.reviews.length;
        const updatedProduct = await product.save();
        res.status(201).send({message:'Įvertinimas sukurtas', review: updatedProduct.reviews[updatedProduct.reviews.length - 1],});
    }else{
        res.status(404).send({message: 'Prekė nerasta'});
    }
}));
export default productRouter;