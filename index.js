require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
    console.log(`✅ Přihlášen jako ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.content === '!banka' && !message.author.bot) {
        // Získání aktuálního času
        const cas = new Date().toLocaleTimeString('cs-CZ', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });

        // Poslání nové zprávy bez odpovědi na autora
        await message.channel.send(`Banka byla vykradena v: ${cas}`);

        // Smazání původního příkazu
        await message.delete().catch(console.error);
    }
});

client.login(process.env.TOKEN);
