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
        const now = new Date();
        const datum = now.toLocaleDateString('cs-CZ'); 
        const cas = now.toLocaleTimeString('cs-CZ', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            timeZone: 'Europe/Prague' 
        });

        const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
        const datum2 = nextHour.toLocaleDateString('cs-CZ');
        const cas2 = nextHour.toLocaleTimeString('cs-CZ', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            timeZone: 'Europe/Prague'
        });

        await message.channel.send(`> 💰   ×   Banka byla vykradena **${datum}** ve **${cas}**.\n > \n> ⏳   ×   Další banka půjde vykrást **${datum2}** ve **${cas2}**.`);

        try {
            await message.delete();
        } catch (error) {
            if (error.code !== 10008) {
                console.error("Chyba při mazání zprávy:", error);
            }
        }
    }
    if (message.content === '!samoska' && !message.author.bot) {
        const now = new Date();
        const datum = now.toLocaleDateString('cs-CZ');
        const cas = now.toLocaleTimeString('cs-CZ', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            timeZone: 'Europe/Prague'
        });

        const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
        const datum2 = nextHour.toLocaleDateString('cs-CZ');
        const cas2 = nextHour.toLocaleTimeString('cs-CZ', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            timeZone: 'Europe/Prague'
        });

        await message.channel.send(`> 🛒   ×   Sámoška byla vykradena **${datum}** ve **${cas}**.\n > \n> ⏳   ×   Další sámoška půjde vykrást **${datum2}** ve **${cas2}**.`);

        try {
            await message.delete();
        } catch (error) {
            if (error.code !== 10008) {
                console.error("Chyba při mazání zprávy:", error);
            }
        }
    }
    if (message.content.startsWith('!zasadit ') && !message.author.bot) {
        const args = message.content.split(' ');
        const pocet = args[1];
        if (!pocet || isNaN(pocet)) {
            return message.channel.send('Musíš zadat platný počet!');
        }
    
        const now = new Date();
        const datum = now.toLocaleDateString('cs-CZ');
        const cas = now.toLocaleTimeString('cs-CZ', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Europe/Prague'
        });
    
        const harvestTime = new Date(now.getTime() + 20 * 60 * 60 * 1000);
        const datum2 = harvestTime.toLocaleDateString('cs-CZ');
        const cas2 = harvestTime.toLocaleTimeString('cs-CZ', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Europe/Prague'
        });
    
        await message.channel.send(`> 🌱   ×   ${message.author} zasadil **${pocet}** weedu **${datum}** ve **${cas}**.\n > \n> ⏳   ×   Sklidit půjde **${datum2}** ve **${cas2}**.`);
    
        try {
            await message.delete();
        } catch (error) {
            if (error.code !== 10008) {
                console.error("Chyba při mazání zprávy:", error);
            }
        }
    }
});

client.login(process.env.TOKEN);
