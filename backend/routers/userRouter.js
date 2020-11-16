import express from 'express';
import data from '../data.js';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

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
}))

export default userRouter