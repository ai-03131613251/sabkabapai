// 𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import { cmd } from '../command.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Owner Image URL ───
const OWNER_IMAGE_URL = 'https://i.ibb.co/ycfnZHzX/MAFIA-ADEEL.jpg';

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

// ─── Badmashi Poetry Lines ───
const poetryLines = [
    "🔥 ᴊɪsɴᴇ ʙʜɪ ᴛᴏᴋᴀ, ᴋʜᴀᴋ ʜᴏ ɢᴀʏᴀ...",
    "💀 ɢʜᴏsᴛ ᴋɪ ᴅᴜɴɪʏᴀ, ʏᴀʜᴀɴ ʙᴀs ᴍᴀғɪᴀ ᴄʜᴀʟᴛᴀ ʜᴀɪ...",
    "⚡ ᴍᴀғɪᴀ ᴀᴀʏᴀ ᴛᴏʜ sɪsᴛᴇᴍ ʜɪʟ ɢᴀʏᴀ...",
    "🚩 ᴀᴀᴅᴀᴛ ɴᴀʜɪ ᴀᴅᴀᴀ ʜᴀɪ ʜᴀᴍᴀʀɪ, ᴊɪsᴇ ᴄʜᴀʜᴇ ᴡᴏʜɪ ᴛᴀʙᴀᴀʜ ʜᴏᴛᴀ ʜᴀɪ...",
    "🔥 ᴅᴜsʜᴍᴀɴ ᴋɪ ᴛᴏ ᴊᴀɴ ᴋᴀʙʜɪ ʙʜɪ ɴɪᴋᴀʟ sᴀᴋᴛᴀ ʜᴜɴ...",
    "💀 ᴋɪɴɢ ᴋɪ ᴛᴀᴋᴅɪʀ ᴍᴇɪɴ ʙᴀᴅsʜᴀʜᴀᴛ ʟɪᴋʜɪ ʜᴏᴛɪ ʜᴀɪ...",
    "⚡ ᴍᴇʀɪ ᴍᴏᴊᴜᴅɢɪ ᴋᴀғɪ ʜᴀɪ ᴅᴜsʜᴍᴀɴᴏɴ ᴋɪ ʙᴀɴᴅ ʙᴀᴊᴀɴᴇ ᴋᴇ ʟɪʏᴇ..."
];

cmd({
    pattern: "owner",
    alias: ["creator", "dev", "developer", "admin", "mafia"],
    use: '.owner',
    desc: "Show bot owner information with image.",
    category: "main",
    react: "👑",
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

        // ─── Random Poetry Line ───
        const poetry = poetryLines[Math.floor(Math.random() * poetryLines.length)];

        // ─── Owner Info ───
        const ownerName = config.OWNER_NAME || '𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ';
        const botVersion = config.VERSION || '12.0.0';
        const prefix = config.PREFIX || '.';

        // ─── Build Owner Text ───
        let ownerText = `╭━━━━━━━━━━━━━━━━━━╮\n`;
        ownerText += `┃  ${botName}\n`;
        ownerText += `╰━━━━━━━━━━━━━━━━━━━⬣\n\n`;

        ownerText += `╭━━〔 👑 ᴏᴡɴᴇʀ ɪɴғᴏ 👑 〕━━━╮\n`;
        ownerText += `┃\n`;
        ownerText += `┃  👤 *ɴᴀᴍᴇ:* ${ownerName}\n`;
        ownerText += `┃  📱 *ɴᴜᴍʙᴇʀ 1:* 923131613251\n`;
        ownerText += `┃  📱 *ɴᴜᴍʙᴇʀ 2:* 923174838990\n`;
        ownerText += `┃  🏷️ *ʙᴏᴛ ᴠᴇʀsɪᴏɴ:* ${botVersion}\n`;
        ownerText += `┃\n`;
        ownerText += `╰━━━━━━━━━━━━━━━━━━━⬣\n\n`;

        ownerText += `╭━━━〔 🎭 ᴘᴏᴇᴛʀʏ 🎭 〕━━━╮\n`;
        ownerText += `┃\n`;
        ownerText += `┃  ${poetry}\n`;
        ownerText += `┃\n`;
        ownerText += `╰━━━━━━━━━━━━━━━━━━━⬣\n\n`;

        ownerText += `╭━━━〔 📇 ᴄᴏɴᴛᴀᴄᴛ 📇 〕━━━╮\n`;
        ownerText += `┃\n`;
        ownerText += `┃  ᴡᴀɴᴛ ᴛᴏ ᴛᴀʟᴋ?\n`;
        ownerText += `┃  ᴛʏᴘᴇ: *${prefix}ᴡᴀ* 923131613251\n`;
        ownerText += `┃\n`;
        ownerText += `┃  ɴᴇᴇᴅ ʜᴇʟᴘ?\n`;
        ownerText += `┃  ᴛʏᴘᴇ: *${prefix}ʜᴇʟᴘ*\n`;
        ownerText += `┃\n`;
        ownerText += `╰━━━━━━━━━━━━━━━━━━━⬣\n`;
        ownerText += `\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ*`;

        const end = new Date().getTime();

        // ─── Send Image with Caption ───
        await conn.sendMessage(from, {
            image: { url: OWNER_IMAGE_URL },
            caption: ownerText,
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
        console.error("Error in owner command:", e);
        reply(`*An error occurred in owner:*\n\`\`\`${e.message}\`\`\``);
    }
});
