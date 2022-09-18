import db from '../db/db.js';
import express from 'express'

async function hadLogin(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    try {
        if (!token) {
            console.log("Token errado")
            return res.sendStatus(401);
        };

        const session = await db.collection('sessions').findOne({ token });

        if (!session) {
            console.log("sessions errada")
            return res.sendStatus(401);
        }

        const user = await db.collection('users').findOne({ _id: session.userId });
        console.log(user);

        if (!user) {
            console.log("User Errado")
            return res.sendStatus(401);
        }

        res.locals.session = session;
        res.locals.user = user;
        next();

    } catch (err) {
        res.send(err);
    }

};

export default hadLogin;