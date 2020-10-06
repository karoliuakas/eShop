import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/newshop',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const app = express();

app.use('/api/users', userRouter);

app.use('/api/products', productRouter);


app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});
app.get('/', (req, res)=>{
    res.send('Serveris užsikūrė');
});

const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`serveris paleistas -> localhost:${port}`);
});