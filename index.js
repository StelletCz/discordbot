require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
    console.log(`✅ Přihlášen jako ${client.user.tag}`);
});

// Přidání Setu na ukládání ID zpráv, které už byly zpracovány
const processedMessages = new Set();

client.on('messageCreate', async (message) => {
    if (message.content === '!banka' && !message.author.bot) {
        // Kontrola, jestli už byla tato zpráva zpracována
        if (processedMessages.has(message.id)) return;
        processedMessages.add(message.id);

        const cas = new Date().toLocaleTimeString('cs-CZ', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });

        // Pošle novou zprávu s časem
        await message.channel.send(`Banka byla vykradena v: ${cas}`);

        // Pokusí se smazat zprávu s příkazem (!banka), ale ignoruje chybu, pokud už neexistuje
        try {
            await message.delete();
        } catch (error) {
            if (error.code !== 10008) {
                console.error("Chyba při mazání zprávy:", error);
            }
        }

        // Po 30 sekundách odstraní zprávu ze Setu (aby se nezaplňovala paměť)
        setTimeout(() => processedMessages.delete(message.id), 30000);
    }
});

client.login(process.env.TOKEN);