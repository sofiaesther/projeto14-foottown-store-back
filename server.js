import express from "express";
import cors from "cors";
import db from "./src/db/db.js";

import cartRouter from './src/routes/cartrouter.js';
import checkoutRouter from "./src/routes/boughtrouter.js";


const port = 5001;
const server = express();

server.use(cors())
server.use(express.json())

server.use(cartRouter);
server.use(checkoutRouter);


server.listen(port, () => { console.log(`listen on port ${port}`) })