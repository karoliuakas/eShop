import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';


dotenv.config();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/newshop',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const app = express();
//tarpininkas(middleware)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRouter);

app.use('/api/products', productRouter);

app.use('/api/orders', orderRouter);

app.get('/', (req, res)=>{
    res.send('Serveris užsikūrė');
});
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});
const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`serveris paleistas -> localhost:${port}`);
});