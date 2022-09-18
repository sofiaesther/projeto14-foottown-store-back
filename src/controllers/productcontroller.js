import db from "../db/db.js";

const getProduct = async (req,res) =>{
    const session = res.locals.session;
    const idProd = req.params.idProduct;
    try{
        const product = await db.collection('products').findOne({_id:idProd});
        res.send(product);

    }catch(err){
        res.send(err);
    };
};

export {getProduct};