import db from "../db/db.js"

const getList = async (req, res) => {
    try {
        const productsList = await db.collection("products").find().toArray();
        res.send(productsList).status(202);

    } catch (error) {
        console.log(error)
        res.sendStatus(501)
    }
}

export { getList }