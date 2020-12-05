import express from 'express';
import data from '../data.js';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken, isAuth } from '../utils.js';

const userRouter = express.Router();
userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    //await User.remove({});
    const createdUsers = await User.insertMany(data.users)
    res.send({ createdUsers });
}));

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                nick: user.nick,
                email: user.email,
                admin: user.admin,
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({ message: 'Blogas el. paštas arba slaptažodis' })
}));

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        nick: req.body.nick,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        nick: createdUser.nick,
        email: createdUser.email,
        admin: createdUser.admin,
        token: generateToken(createdUser)
    })
}));

userRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id);
    if(user){
        res.send(user);
    }else{
        res.status(404).send({message: 'Naudotojas nerastas'});
    }
}));

userRouter.put('/profile', isAuth, expressAsyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.nick = req.body.nick || user.nick;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            nick: updatedUser.nick,
            email: updatedUser.email,
            admin: updatedUser.admin,
            token: generateToken(updatedUser),
        });
    }
}))
export default userRouter