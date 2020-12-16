import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';


dotenv.config();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/newshop',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res)=>{
    res.send('Serveris veikia');
});
app.use((err, req, res) => {
    res.status(500).send({message: err.message});
});
const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`serveris paleistas -> localhost:${port}`);
});