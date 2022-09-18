import db from "../db/db.js";
import joi from 'joi';

const checkoutSchema = joi.object({
    paymentName: joi.string().required(),
    Address: joi.string().required(),
    cardNumber: joi.number().min(16).required(),
    Valid: joi.date().required(),
    cardName: joi.string().required(),
    CVV: joi.number().min(16).required()
});

function Checkout(req, res, next) {
    const validation = checkoutSchema.validate(req.body, { abortEarly: true });
    if (validation.error) {
        console.log(validation.error.details.message);
        res.sendStatus(422);
        return;
    };
    next();
};

export default Checkout;