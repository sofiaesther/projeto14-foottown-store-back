import express from "express";
import cors from "cors";
import authRouter from "./src/routes/authRouter.js"
import shopRouter from "./src/routes/shopRouter.js"

const port = 5001;
const server = express();

server.use(cors())
server.use(express.json())
server.use(authRouter)
server.use(shopRouter)



server.listen(port, () => { console.log(`listen on port ${port}`) })