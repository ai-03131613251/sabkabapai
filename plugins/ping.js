// 𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import { cmd } from '../command.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const botName = "𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩";

cmd({
    pattern: "ping",
    alias: ["speed", "pong", "latency"],
    use: '.ping',
    desc: "Check bot's response time with progressive edit.",
    category: "main",
    react: "💎",
    filename: __filename
},

async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        // 1st Message - Loading
        let msg = await conn.sendMessage(from, {
            text: `╭┈───〔 ${botName} 〕┈───⊷
┋⋄ ➠ 𝗣𝗶𝗻𝗴𝗶𝗻𝗴...
╰─────────────────────⊷`
        }, { quoted: mek });

        await new Promise(resolve => setTimeout(resolve, 800));

        // 2nd Edit - Name
        await conn.sendMessage(from, {
            text: `╭┈───〔 ${botName} 〕┈───⊷
┋⋄ ➠ مــٰٰ۬͜ـٰ۬ـٖـ٘افـٰ۬ـٖیـٰ۬ـٖــؔــا عـــٰٰ۬͜ـٰ۬ـٖـ٘دیـٰ۬ـٖـٰ۬ـٖــؔــل
╰─────────────────────⊷`,
            edit: msg.key
        });

        await new Promise(resolve => setTimeout(resolve, 800));

        // 3rd Edit - Name + Link
        await conn.sendMessage(from, {
            text: `╭┈───〔 ${botName} 〕┈───⊷
┋⋄ ➠ مــٰٰ۬͜ـٰ۬ـٖـ٘افـٰ۬ـٖیـٰ۬ـٖــؔــا عـــٰٰ۬͜ـٰ۬ـٖـ٘دیـٰ۬ـٖـٰ۬ـٖــؔــل
┋⋄ ➠ https://ghost-mini-bot.vercel.app/
╰─────────────────────⊷`,
            edit: msg.key
        });

        await new Promise(resolve => setTimeout(resolve, 800));

        const end = new Date().getTime();
        const responseTime = ((end - start) / 1000).toFixed(2);

        // Final Edit - Full Result
        await conn.sendMessage(from, {
            text: `╭┈───〔 ${botName} 〕┈───⊷
┋⋄ ➠ مــٰٰ۬͜ـٰ۬ـٖـ٘افـٰ۬ـٖیـٰ۬ـٖــؔــا عـــٰٰ۬͜ـٰ۬ـٖـ٘دیـٰ۬ـٖـٰ۬ـٖــؔــل
┋⋄ ➠ https://ghost-mini-bot.vercel.app/
┋⋄ ➠ 𝗦𝗽𝗲𝗲𝗱 : ${responseTime} ᴍs
┋⋄ ➠ 𝗦𝘁𝗮𝘁𝘂𝘀 : Online
╰─────────────────────⊷`,
            edit: msg.key,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363404811118873@newsletter',
                    newsletterName: "𝐆ʜᴏsᴛ-𝐌ᴅ",
                    serverMessageId: 143
                }
            }
        });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`*An error occurred:* \`\`\`${e.message}\`\`\``);
    }
});
