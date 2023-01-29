import express from 'express';
import passport from 'passport';
import config from '../config';
import client from '../bot';

const router = express.Router();

router.get("/guilds", (req: UserRequest, res) => {
    if (!req.user) return res.redirect("/login");
    const guilds = req.user.guilds.filter((guild: any) => guild.owner && client.guilds.cache.get(guild.id))
    return !guilds.length ? res.status(404).json(undefined) : res.status(200).json(guilds);
});

interface User {
    id: string;
    name: string;
    email: string;
    guilds: Array<object>;
};

interface UserRequest extends express.Request {
    user: User;
};

export default router;