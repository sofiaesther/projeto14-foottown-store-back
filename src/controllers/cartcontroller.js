import db from "../db/db.js";

const getCart = async (req, res) => {
    const session = res.locals.session;
    try {
        const cart = await db.collection('cart').findOne({ userId: session._id });
        console.log(cart, "cart");
        const itens = [];
        const usercart = cart.itens;
        console.log(usercart, "userCart")
        for (let i = 0; i < usercart.length; i++) {
            let itemid = usercart[i];
            console.log(itemid[i], "itemId");
            const item = await db.collection('products').findOne({ _id: parseInt(itemid) });
            console.log(item, "item");
            itens.push(item);
        };

        res.send(itens);

    } catch (err) {
        res.send(err);
    };
};

const addCart = async (req, res) => {
    const client = res.locals.user;
    const session = res.locals.session;
    const { itemId } = req.body;

    try {
        const userCart = await db.collection('cart').findOne({ userId: session._id });
        console.log(userCart, "userCart")
        const itensList = userCart.itens;
        console.log(itensList, "itemList");
        itensList.push(itemId);
        const newItens = { itens: itensList };
        console.log(newItens, "addCartNewItens")
        await db.collection('cart').updateOne({
            _id: userCart._id
        }, { $set: newItens });

        res.send(201);

    } catch (err) {
        res.send(err);
    };
};

const removeCart = async (req, res) => {
    const client = res.locals.user;
    const { itemId } = req.body;

    try {
        const userCart = await db.collection('cart').findOne({ id: client._id });
        const itensList = userCart.itens;
        itensList.filter((i) => i !== itemId);
        newItens = { itens: itensList };
        await db.collection('cart').updateOne({
            _id: userCart._id
        }, { $set: newItens });

    } catch (err) {
        res.send(err);
    };
};

export { addCart, removeCart, getCart };