import db from "../db/db.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const checkout = async (req, res) => {
    const session = res.locals.session;

    const { paymentName, Address, cardNumber, Valid, cardName, CVV } = req.body;

    try {
        const criptCVV = bcrypt.hashSync(CVV, 10);
        const cart = await db.collection('cart').findOne({ userId: session._id });
        const checkout = {
            paymentName: paymentName,
            address: Address,
            cardName: cardName,
            cardNumber: cardNumber,
            validDate: Valid,
            userId: session.userId,
            items: cart.itens
        };
        await db.collection('checkout').insertOne(checkout);
        res.send(201);

    } catch (err) {
        res.send(err);
    };
};

export { checkout };