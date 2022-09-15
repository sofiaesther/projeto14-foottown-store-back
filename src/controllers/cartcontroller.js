import db from "../db/db.js";

const addCart = async (req,res)=>{
    const client = res.locals.user;
    const { itemId } = req.body;

    try{
        const userCart = await db.collection('carts').findOne({userId:client._id});
        const itensList = userCart.itens;
        itensList.push(itemId);
        const newItens = {itens:itensList};
        await db.collection('carts').updateOne({
            _id:userCart._id
        },{$set:newItens});

        res.send(201);

    }catch(err){
        res.send(err);
    };
};

const removeCart = async (req,res)=>{
    const client = res.locals.user;
    const { itemId } = req.body;

    try{
        const userCart = await db.collection('carts').findOne({userId:client._id});
        const itensList = userCart.itens;
        itensList.filter((i)=>i!==itemId);
        newItens = {itens: itensList};
        await db.collection('carts').updateOne({
            _id:userCart._id
        },{$set:newItens});

    }catch(err){
        res.send(err);
    };
};

export {addCart, removeCart};