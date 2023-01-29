import express from 'express';
import passport from 'passport';
import config from '../config';

const router = express.Router();

router.get("/", passport.authenticate("discord", { scope: config.scope }), (req, res) => {
    res.send(200);
});

router.get("/status", (req, res) => {
    return req.user ? res.status(200).json(req.user) : res.status(404).json(null);
});

router.get("/logout", (req, res) => {
    if(!req.user) return res.redirect("http://localhost:5173");
    (req as any).session.destroy(() => {
        req.logOut({ keepSessionInfo: false }, () => undefined);
        res.clearCookie("discord");
        res.redirect("http://localhost:5173");
    })
});

router.get("/callback", passport.authenticate("discord", { failureRedirect: "/error" }), (request, response) => {
    response.redirect("http://localhost:5173")
});

export default router;