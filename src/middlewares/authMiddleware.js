import db from '../db/db.js';

async function hadLogin( req, res, next ){
    const { Authorization } = req.headers;
    const token = Authorization?.replace('Bearer ', '');

    try{
        if (!token){
            return res.sendStatus(401);
        };

        const session = await db.collection('sessions').findOne({ token });
        
        if(!session){
            return res.sendStatus(401);
        }

        const user = await db.collection('users').findOne({_id:session.userId});

        if(!user){
            return res.sendStatus(401);
        }

        res.locals.session = session;
        res.locals.user = user;
        next();

    }catch(err){
        res.send(err);
    }

};

export default hadLogin;