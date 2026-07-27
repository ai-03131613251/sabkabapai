// 𝐀𝐃𝐄𝐄𝐋-𝐌𝐃💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import { cmd } from '../command.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cmd({
    pattern: "bot",
    alias: ["start", "hi", "hello"],
    desc: "Check if bot is active",
    react: "✅",
    category: "main",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    try {
        const message = `╭━〔 𝐆ʜᴏsᴛ-𝐌ᴅ 〕━⬣
│     *ʙᴏᴛ ɪꜱ ᴀᴄᴛɪᴠᴇ*
│     *ᴜsᴇ 𝐆ʜᴏsᴛ-𝐌ᴅ*
│     *ᴠᴇʀsɪᴏɴ ᴠ.7*
╰━━━━━━━━━━━━━━━╯

ʜᴇʟʟᴏ! 👋 ɪ ᴀᴍ ᴀ 𝐆ʜᴏsᴛ-𝐌ᴅ ꜰᴀꜱᴛ & ᴘᴏᴡᴇʀꜰᴜʟ
ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴡɪᴛʜ ᴀᴍᴀᴢɪɴɢ ꜰᴇᴀᴛᴜʀᴇꜱ 🚀

╭─☢︎︎ *ᴄᴏᴍᴍᴀɴᴅꜱ* ☢︎︎
│
│ ☠︎︎ ᴛʏᴘᴇ *.ᴍᴇɴᴜ* ➜ ᴀʟʟ ᴄᴏᴍᴍᴀɴᴅꜱ
│ ☠︎︎ ᴛʏᴘᴇ *.ᴘɪɴɢ* ➜ ᴄʜᴇᴄᴋ ꜱᴘᴇᴇᴅ
│ ☠︎︎ ᴛʏᴘᴇ *.ᴜᴘᴅᴀᴛᴇ* ➜ ʟᴀᴛᴇꜱᴛ ᴠᴇʀꜱɪᴏɴ
│
╰─────────────────☻︎
╭━〔 𝐆ʜᴏsᴛ-𝐌ᴅ 〕━⬣
│┈╱▔╲▂╱╱╱╱▂╱▔╲┈┈
│▕▔╲┈╱▔╲┈┈╱╲╱▔▏┈
│▕▏┈▏╱▉╲┈┈╱▉╲▕▏┈
│┈╲▃▏▔▔▔╲▂▂▂▕╱┈┈
│┈┈┈▏┊┊┳┊╲▂╱┳▏┈┈
│┈┈▕╲▂┊╰━━┻━╱┈┈┈
│┈┈╱┈┈▔▔╲▂▂╱╲┈┈┈
╰━━━━━━━━━━━━━━━╯

> *ᴛʏᴘᴇ .ᴍᴇɴᴜ ᴛᴏ ꜱᴛᴀʀᴛ* 🎉`;

        await conn.sendMessage(from, {
            text: message,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363404811118873@newsletter',
                    newsletterName: '𝐆ʜᴏsᴛ-𝐌ᴅ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error:", error);
        reply("❌ ᴇʀʀᴏʀ!");
    }
});
