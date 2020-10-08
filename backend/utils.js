import jwt from 'jsonwebtoken';
export const generateToken = (user) =>{
    return jwt.sign({_id: user._id, nick: user.nick, email: user.email, admin: user.admin},""+process.env.JWT_SECRET || 'slaptasisraktazodispaleisti', {expiresIn: '30d',});
};