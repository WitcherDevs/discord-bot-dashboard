import passport from 'passport';
import user from '../models/user';
import config from '../config';
import { Strategy } from 'passport-discord';

const passportManager = function () {
    passport.serializeUser((profile: any, done) => {
    return done(null, profile.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let resUser = await user.findById(id);
        return resUser ? done(null, resUser) : done(null, null);
    } catch (err) {
        console.log(err);
        return done(err, null);
    }
});

passport.use(new Strategy({
    clientID: config.clientID,
    clientSecret: config.secretID,
    callbackURL: config.redirectURL,
    scope: config.scope
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let resultUser = await user.findOneAndUpdate({ discordID: profile.id }, {$set: { username: profile.username, discriminator: profile.discriminator, avatar: profile.avatar, guilds: profile.guilds }}, { upsert: true});
        if(resultUser) return done(null, resultUser);
        let newUser = new user({ discordID: profile.id, username: profile.username, discriminator: profile.discriminator, avatar: profile.avatar, guilds: profile.guilds }).save()
        return done(null, newUser);
    } catch (err) {
        console.log(err);
        return done(err, undefined);
    }
}))};

export default passportManager;