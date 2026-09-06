// 𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import { cmd } from '../command.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const botName = "𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩";
const ownerName = "𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ🚩👑";

// ─── Video URL ───
const ALIVE_VIDEO = 'https://files.catbox.moe/your-video.mp4';  // ← Apni video ka link yahan daalo

cmd({
    pattern: "alive",
    alias: ["online", "bot", "status"],
    use: '.alive',
    desc: "Check if bot is alive.",
    category: "main",
    react: "💗",
    filename: __filename
},

async (conn, mek, m, { from, quoted, sender, pushname, reply }) => {
    try {
        const caption = `╭┈───〔 ${botName} 〕┈───⊷
┋⋄ ➠ 𝗢𝘄𝗻𝗲𝗿 : ${ownerName}
┋⋄ ➠ 𝗨𝘀𝗲𝗿 : ${pushname || 'User'}
╰─────────────────────⊷

╔══╗....<3
╚╗╔╝..('\\../')
╔╝╚╗..( •.• )
╚══╝..(,,)(,,)
╔╗╔═╦╦╦═╗ ╔╗╔╗
║╚╣║║║║╩╣ ║╚╝║
╚═╩═╩═╩═╝ ╚══╝

╭┈───〔 💌 ᴘᴏᴇᴛʀʏ 💌 〕┈───⊷
┋⋄ ➠ 🫶____//"
┋⋄ ➠ *_❤️‍🩹ہـــؔـر کســـؔـی کے بـــؔـس کی بـــؔـات نہیـــؔـں ہوتـــؔـی🫠_*
┋⋄ ➠ *_کســـؔـی ایـــؔـک کے لیـــؔـے وفـــؔـادار ہـــؔـونا🌸💖_*
┋⋄ ➠ *${ownerName}*
╰─────────────────────⊷

> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${ownerName}*`;

        await conn.sendMessage(from, {
            video: { url: ALIVE_VIDEO },
            caption: caption,
            gifPlayback: true,
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
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`*Error:* \`\`\`${e.message}\`\`\``);
    }
});
