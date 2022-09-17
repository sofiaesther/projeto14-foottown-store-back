import db from "../db/db.js";

const getCart = async (req,res) =>{
    const session = res.locals.session;
    try{
        const cart = await db.collection('carts').findOne({userId:session._id});
        const itens =[];
        for (let i =0; i<cart.itens.length; i++){
            let itemid = cart.itens[i];
            const item = await db.collection('itens').findOne({_id:itemid});
            itens.push(item);
        };

        res.send(itens);

    }catch(err){
        res.send(err);
    };
};

const addCart = async (req,res)=>{
    const client = res.locals.user;
    const session = res.locals.session;
    const { itemId } = req.body;

    try{
        const userCart = await db.collection('carts').findOne({userId:session._id});
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
        const userCart = await db.collection('carts').findOne({id:client._id});
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

export {addCart, removeCart, getCart};