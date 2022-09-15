import db from "../db/db.js";
import bcrypt from "bcrypt";
import joi from "joi";
import { v4 as uuid } from "uuid";

const signUp = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        const userRepeated = await db.collection("users").find({ name }).toArray();
        console.log(userRepeated);

        if (userRepeated.length !== 0) {
            res.sendStatus(409);
            return;
        }

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
        const response = await db.collection("users").insertOne({ name, email, password: encryptedPassword })

        res.sendStatus(202);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {

        const userSchema = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required().min(8)
        })

        const validation = userSchema.validate({ email, password }, { abortEarly: false });

        if (validation.error) {
            console.log(validation.error.details.message);
            res.sendStatus(422);
            return;
        }

        const user = await db.collection("users").findOne({ email });
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (user && isPasswordValid) {
            const token = uuid();
            const session = await db.collection("sessions").insertOne({
                userId: user._id,
                token
            })

            res.status(202).send(token);
        } else {
            res.sendStatus(401);
        }


    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }

}

export { signUp, signIn }