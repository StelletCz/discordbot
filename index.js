require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
    console.log(`✅ Přihlášen jako ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.content === '!banka') {
        const cas = new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        message.reply(`Banka byla vykradena v: ${cas}`);
    }
});

client.login(process.env.TOKEN);
