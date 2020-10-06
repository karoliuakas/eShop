import mongoose from 'mongoose';

const userSch = new mongoose.Schema({
    nick: {type: String, required: true},
    pw: {type: String, required: true},
    email:{type: String, required: true, unique: true},
    admin: {type: Boolean, default: false, required: true}

},{
    timestamps: true
} );

const User = mongoose.model("User", userSch);
export default User;