import jwt from 'jsonwebtoken';
export const generateToken = (user) =>{
    return jwt.sign({_id: user._id, nick: user.nick, email: user.email, admin: user.admin},""+process.env.JWT_SECRET || 'slaptasisraktazodispaleisti', {expiresIn: '30d',});
};

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, ""+process.env.JWT_SECRET || 'slaptasisraktazodispaleisti',(err,decode)=>{
            if(err){
                res.status(401).send({
                    message: 'Bloga autorizacija'
                });
            }
            else{
                req.user = decode;
                next();
            }
        });
    }
    else{
        res.status(401).send({
            message: 'Nėra autorizacijos'
        });
    }
};
export const isAdmin = (req, res, next) =>{
    if(req.user && req.user.admin){
        next();
    }
    else{
        res.status(401).send({
            message: 'Nėra administratoriaus autorizacijos'
        });
    }
}