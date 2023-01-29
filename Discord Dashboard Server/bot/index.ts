import { Client } from 'discord.js';
import config from '../config';

const client = new Client({
    intents: [3276799]
});

client.on("ready", async () => {
    console.log("Logged in as " + client.user.tag);
});

client.login(config.token);

export default client;