import db from "../db/db.js";
import bcrypt from "bcrypt";
import joi from "joi";
import { v4 as uuid } from "uuid";


const signUp = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        const userRepeated = await db.collection("users").find({ name }).toArray();

        if (userRepeated.length !== 0) {
            res.sendStatus(409);
            return;
        }

        const registerSchema = joi.object({
            name: joi.string().required().min(1).empty(),
            email: joi.string().required().email().empty(),
            password: joi.string().required().min(8).empty(),
            confirmPassword: joi.ref("password")
        })

        const validation = registerSchema.validate({ name, email, password, confirmPassword }, { abortEarly: false })

        if (validation.error) {
            res.status(422).send(validation.error.details[0].message);
            return;
        }


        const encryptedPassword = bcrypt.hashSync(password, 10);
        const response = await db.collection("users").insertOne({ name, email, password: encryptedPassword })

        res.sendStatus(202);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const signIn = async (req, res) => {
    const products = [{ "_id": 1, "name": "Tênis Zoomx", "price": 1800, "description": "O que era bom ficou melhor com a evolução do Nike Zoomx Vaporfly Next% 2 para corredor que busca responsividade nas corridas.", "image": "https://imgcentauro-a.akamaihd.net/250x250/96335538A1/tenis-nike-zoomx-vaporfly-next-2-feminino-img.jpg", "type": "sport" },
    { "_id": 2, "name": "Tênis Lite", "price": 189, "description": "O tênis perfeito para te acompanhar na hora dos exercícios físicos ao ar livre, academia e até mesmo no dia a dia. O Lite Racer 3.0 possui tecnologia CloudFoam que promove leveza e absorção de impactos e a PRIMGREEN que é uma ação sustentável da marca.", "image": "https://imgcentauro-a.akamaihd.net/250x250/96943362A1/tenis-adidas-lite-racer-3-0-masculino-img.jpg", "type": "sport" },
    { "_id": 3, "name": "Tênis Guardiam", "price": 384, "description": "Tênis Mizuno Guardian 4 - Masculino", "image": "https://imgcentauro-a.akamaihd.net/250x250/M0OCRF04A1/tenis-mizuno-guardian-4-masculino-img.jpg", "type": "sport" },
    { "_id": 4, "name": "Bota Nord", "price": 129, "description": "A qualidade Nord em todos os detalhes dessa Bota de Couro Atacama New.", "image": "https://imgcentauro-a.akamaihd.net/250x250/972837NEA1/bota-de-couro-nord-atacama-new-masculina-img.jpg", "type": "sport" },
    { "_id": 5, "name": "All star", "price": 250, "description": "o Tênis Cano alto Converse All Star CT AS Core HI CT0004 e é a escolha perfeita para qualquer ocasião do dia", "image": "https://imgcentauro-a.akamaihd.net/250x250/88383319A1/tenis-cano-alto-converse-all-star-ct-as-core-hi-ct0004-unissex-img.jpg", "type": "fancy" },
    { "_id": 6, "name": "Tênis Puma", "price": 330, "description": "Um modelo clássico para você que busca um look mais discreto e esportivo para as atividades do dia a dia é o Tênis Puma Carina Lux L BDP Feminino possui estrutura em couro e sintético.", "image": "https://imgcentauro-a.akamaihd.net/250x250/94962101A1/tenis-puma-carina-lux-l-bdp-feminino-img.jpg", "type": "fancy" },
    { "_id": 7, "name": "Tênis street", "price": 280, "description": "Moderno e cheio de estilo, este tênis adidas feminino é a escolha inteligente para incrementar seu look do dia a dia.", "image": "https://imgcentauro-a.akamaihd.net/250x250/96946451A1/tenis-adidas-streetcheck-feminino-img.jpg", "type": "fancy" },
    { "_id": 8, "name": "Tênis court", "price": 550, "description": "Moderno e inconfundível, o tênis Nike masculino é a opção ideal em todos os momentos.", "image": "https://imgcentauro-a.akamaihd.net/250x250/96311201A1/tenis-nike-court-vision-lo-feminino-img.jpg", "type": "fancy" }
    ]
    const { email, password } = req.body;

    try {
        const user = await db.collection("users").findOne({ email });
        console.log(user.password)

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (user && isPasswordValid) {
            const token = uuid();
            const session = await db.collection("sessions").insertOne({
                userId: user._id,
                token
            })

            await db.collection("products").insertMany(products)

            res.status(202).send(token);
        } else {
            res.sendStatus(401)
        }


    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }

}

export { signUp, signIn }