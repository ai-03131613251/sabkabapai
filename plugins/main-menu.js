// menu.js - MINI VERSION (100% Working)
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import { cmd, commands } from '../command.js';
import { runtime } from '../lib/functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cmd({
    pattern: "menu",
    alias: ["m", "help"],
    desc: "Show all bot commands",
    category: "main",
    react: "👻",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {

    try {
        await conn.sendMessage(from, { react: { text: '⏳', key: mek.key } });

        let menu = `╭━〔 𝙱ᴏᴛ 𝙼ᴇɴᴜ 〕━⬣\n`;
        menu += `┃۞ 𝐁𝐎𝐓: 𝙶ʜᴏsᴛ Mᴅ\n`;
        menu += `┃۞ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒: ${commands.length}\n`;
        menu += `┃۞ 𝐑𝐔𝐍𝐓𝐈𝐌𝐄: ${runtime(process.uptime())}\n`;
        menu += `╰━━━━━━━━━━━━━━⪼\n\n`;
        
        // سادہ کیٹیگریز
        const grouped = {};
        for (const c of commands) {
            if (!c.category) continue;
            if (!grouped[c.category]) grouped[c.category] = [];
            grouped[c.category].push(c);
        }

        for (const cat of Object.keys(grouped)) {
            menu += `╭━━❰ ${cat.toUpperCase()} ❱━━✪\n`;
            for (const c of grouped[cat]) {
                if (c.pattern && !c.dontAddCommandList) {
                    menu += `┃۞ ${c.pattern}\n`;
                }
            }
            menu += `╰━━━━━━━━━━━━━━⪼\n\n`;
        }

        menu += `> ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ`;

        await conn.sendMessage(from, { text: menu }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });

    } catch (e) {
        console.error("MENU ERROR:", e);
        try {
            await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        } catch (_) {}
        await reply("❌ Menu error: " + e.message);
    }
});
