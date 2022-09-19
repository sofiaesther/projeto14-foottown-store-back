import express from "express";
import cors from "cors";
import db from "./src/db/db.js";

import cartRouter from './src/routes/cartrouter.js';
import checkoutRouter from "./src/routes/boughtrouter.js";
import productRouter from './src/routes/productrouter.js';
import authRouter from "./src/routes/authRouter.js"
import shopRouter from "./src/routes/shopRouter.js"

const port = 5001;
const server = express();
server.use(cors());
server.use(express.json());

server.use(authRouter);
server.use(shopRouter);
server.use(cartRouter);
server.use(checkoutRouter);
server.use(productRouter);




server.listen(process.env.PORT || 5001, () => { console.log(`listen on port ${process.env.PORT}`) })
