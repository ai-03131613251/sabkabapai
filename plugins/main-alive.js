// alive.js - ESM Version
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { cmd } from '../command.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cmd({
    pattern: "alive",
    alias: ["alive1", "runtime"],
    desc: "Alive message",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from }) => {

    try {

        await conn.sendMessage(from, {
            text: `╭━━━〔 ⚡ 𝗡𝗔𝗪𝗔𝗭 𝗠𝗗 ⚡ 〕━━━⬣

> 🟢 BOT STATUS : ONLINE
> ⚡ SYSTEM : ACTIVE
> 🚀 SPEED : STABLE
> 🔰 MODE : PUBLIC
> 💻 ENGINE : WHATSAPP MD

━━━━━━━━━━━━━━━━━━

✨ Welcome To NAWAZ MD

🤖 Your bot has been started successfully and is now online.

📌 All commands are active and working perfectly.

⚙️ Enjoy fast performance, smooth response and powerful features.

💡 Type *.menu* to explore all available commands.

❤️ Thank you for choosing NAWAZ MD.
We hope you enjoy the best WhatsApp Bot experience.

━━━━━━━━━━━━━━━━━━

👑 POWERED BY NAWAZ TECH
╰━━━━━━━━━━━━━━━━━━⬣`,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363426829681935@newsletter",
                    newsletterName: "NAWAZ TECH MD",
                    serverMessageId: Date.now().toString()
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        await conn.sendMessage(from, {
            text: "❌ Error in alive command"
        }, { quoted: mek });
    }

});
