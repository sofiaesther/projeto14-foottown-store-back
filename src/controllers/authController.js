import db from "../db/db.js";
import bcrypt from "bcrypt";
import joi from "joi";

const signUp = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        const registerSchema = joi.object({
            name: joi.string().required().min(1),
            email: joi.string().required().email(),
            password: joi.string().required().min(8),
            confirmPassword: joi.ref("password")
        })

        const validation = registerSchema.validate({ name, email, password, confirmPassword }, { abortEarly: false })

        if (validation.error) {
            console.log(validation.error.details.message)
            res.sendStatus(422);
            return;
        }

        const encryptedPassword = bcrypt.hashSync(password, 10);
        console.log(encryptedPassword);
        const response = db.collection("users").insertOne({ name, email, password: encryptedPassword })

        res.sendStatus(202);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { signUp }