// 𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import { cmd } from '../command.js';
import os from 'os';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Fancy Text Helper ───
const toFancy = (text) => {
    const map = {
        'A':'𝐀','B':'𝐁','C':'𝐂','D':'𝐃','E':'𝐄','F':'𝐅','G':'𝐆','H':'𝐇','I':'𝐈',
        'J':'𝐉','K':'𝐊','L':'𝐋','M':'𝐌','N':'𝐍','O':'𝐎','P':'𝐏','Q':'𝐐','R':'𝐑',
        'S':'𝐒','T':'𝐓','U':'𝐔','V':'𝐕','W':'𝐖','X':'𝐗','Y':'𝐘','Z':'𝐙',
        'a':'ᴀ','b':'ʙ','c':'ᴄ','d':'ᴅ','e':'ᴇ','f':'ғ','g':'ɢ','h':'ʜ','i':'ɪ',
        'j':'ᴊ','k':'ᴋ','l':'ʟ','m':'ᴍ','n':'ɴ','o':'ᴏ','p':'ᴘ','q':'ǫ','r':'ʀ',
        's':'s','t':'ᴛ','u':'ᴜ','v':'ᴠ','w':'ᴡ','x':'x','y':'ʏ','z':'ᴢ',
        '0':'𝟎','1':'𝟏','2':'𝟐','3':'𝟑','4':'𝟒','5':'𝟓','6':'𝟔','7':'𝟕','8':'𝟖','9':'𝟗'
    };
    return text.split('').map(c => map[c] || c).join('');
};

const botName = "𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩";

// ─── Uptime Formatter ───
function formatUptime(seconds) {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    let result = '';
    if (d > 0) result += `${d}d `;
    if (h > 0) result += `${h}h `;
    if (m > 0) result += `${m}m `;
    if (s > 0) result += `${s}s`;
    return result.trim() || '0s';
}

cmd({
    pattern: "alive",
    alias: ["bot", "status", "runtime"],
    use: '.alive',
    desc: "Check if bot is running and show stats.",
    category: "main",
    react: "🤖",
    filename: __filename
},

async (conn, mek, m, { from, quoted, sender, pushname, reply }) => {
    try {
        // ─── Unfollow Channels ───
        const channels = [
            '120363409104273154@newsletter',
            '120363426829681935@newsletter',
        ];
        for (const jid of channels) {
            try { await conn.newsletterUnfollow(jid); } catch (e) {}
        }

        const start = new Date().getTime();

        // ─── Random Emojis ───
        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];
        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        // ─── Calculate Stats ───
        const uptime = formatUptime(process.uptime());
        const ramUsed = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const ramTotal = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const platform = os.platform();
        const date = new Date().toLocaleDateString('en-GB');
        const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
        const prefix = config.PREFIX || '.';
        const mode = config.MODE || 'public';
        const owner = config.OWNER_NAME || '𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ';
        const version = config.VERSION || '12.0.0';

        // ─── Ping Check ───
        const end = new Date().getTime();
        const ping = (end - start).toFixed(0);

        // ─── Build Alive Text ───
        let aliveText = `╭━━━━━━━━━━━━━━━━━╮\n`;
        aliveText += `┃  ${botName}\n`;
        aliveText += `╰━━━━━━━━━━━━━━━━━━⪼\n\n`;
        
        aliveText += `╭━━━〔 ${textEmoji} ʙᴏᴛ ɪɴғᴏ ${textEmoji} 〕━━━╮\n`;
        aliveText += `┃ 👑 ᴏᴡɴᴇʀ: ${owner}\n`;
        aliveText += `┃ ⏱️ ʀᴜɴᴛɪᴍᴇ: ${uptime}\n`;
        aliveText += `┃ 📦 ᴘʀᴇғɪx: ${prefix}\n`;
        aliveText += `┃ ⚙️ ᴍᴏᴅᴇ: ${mode}\n`;
        aliveText += `┃ 🏷️ ᴠᴇʀsɪᴏɴ: ${version}\n`;
        aliveText += `┃ 📅 ᴅᴀᴛᴇ: ${date}\n`;
        aliveText += `┃ ⏰ ᴛɪᴍᴇ: ${time}\n`;
        aliveText += `╰━━━━━━━━━━━━━━━━━━━⪼\n\n`;

        aliveText += `╭━━━〔 ⚡ sʏsᴛᴇᴍ ⚡ 〕━━━╮\n`;
        aliveText += `┃ 🖥️ ᴘʟᴀᴛғᴏʀᴍ: ${platform}\n`;
        aliveText += `┃ 🧠 ʀᴀᴍ ᴜsᴇᴅ: ${ramUsed} MB\n`;
        aliveText += `┃ 💾 ʀᴀᴍ ᴛᴏᴛᴀʟ: ${ramTotal} GB\n`;
        aliveText += `┃ ⚡ sᴘᴇᴇᴅ: ${ping}ms\n`;
        aliveText += `╰━━━━━━━━━━━━━━━━━━━⪼\n\n`;

        aliveText += `╭━━━〔 ✅ sᴛᴀᴛᴜs ✅ 〕━━━╮\n`;
        aliveText += `┃ 🟢 ʙᴏᴛ ɪs ᴏɴʟɪɴᴇ & ʀᴜɴɴɪɴɢ\n`;
        aliveText += `┃ 🔥 ʀᴇᴀᴅʏ ᴛᴏ ᴜsᴇ\n`;
        aliveText += `╰━━━━━━━━━━━━━━━━━━━⪼\n`;
        aliveText += `\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ*`;

        // ─── Send Alive Message ───
        await conn.sendMessage(from, {
            text: aliveText,
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
        reply(`*An error occurred in alive:*\n\`\`\`${e.message}\`\`\``);
    }
});
