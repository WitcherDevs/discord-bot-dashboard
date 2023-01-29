const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    discordID: { type: String, default: null, unique: true },
    username: { type: String, default: null},
    discriminator: { type: String, default: null },
    avatar: { type: String, default: null },
    guilds: { type: Array, default: null },
});

export default model('Users', userSchema);