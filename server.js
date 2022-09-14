import express from "express";
import cors from "cors";
import db from "./src/db/db.js"
import authRouter from "./src/routes/authRouter.js"
import { ServerApiVersion } from "mongodb";

const port = 5001;
const server = express();

server.use(cors())
server.use(express.json())
server.use(authRouter)



server.listen(port, () => { console.log(`listen on port ${port}`) })