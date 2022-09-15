import db from '../db/db.js';

async function hasCart(req, res, next){
    client = res.locals.user;

    try{
        const cart = await db.collection('carts').findOne({userId:client._id});
        if (!cart){
            const newCart = {
                userId:client._id,
                itens:[]
            };
            await db.collection('cart').insertOne(newCart);
        }
        next();

    } catch(err){
    res.send(err);
    };
};

export default hasCart;
