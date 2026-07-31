// 𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import { cmd } from '../command.js';
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

cmd({
    pattern: "repo",
    alias: ["repository", "script", "github", "minibot"],
    use: '.repo',
    desc: "Get bot repository and mini bot deploy guide.",
    category: "main",
    react: "📂",
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

        // ─── Build Repo Text ───
        let repoText = `╭━━━━━━━━━━━━━━━━━━╮\n`;
        repoText += `┃  ${botName}\n`;
        repoText += `╰━━━━━━━━━━━━━━━━━━━⬣\n\n`;

        repoText += `╭━━━〔 ${textEmoji} ʀᴇᴘᴏsɪᴛᴏʀʏ ${textEmoji} 〕━━━╮\n`;
        repoText += `┃\n`;
        repoText += `┃ 🔗 *Mini Bot Link:*\n`;
        repoText += `┃ https://ghost-mini-bot.vercel.app/\n`;
        repoText += `┃\n`;
        repoText += `┃ 📌 *How to Deploy Mini Bot:*\n`;
        repoText += `┃\n`;
        repoText += `┃ 1️⃣ ᴄʟɪᴄᴋ ᴛʜᴇ ʟɪɴᴋ ᴀʙᴏᴠᴇ\n`;
        repoText += `┃ 2️⃣ ᴄʟɪᴄᴋ ᴏɴ *sᴇʀᴠᴇʀ*\n`;
        repoText += `┃ 3️⃣ ᴄʜᴏᴏsᴇ ᴀɴʏ sᴇʀᴠᴇʀ\n`;
        repoText += `┃ 4️⃣ ᴇɴᴛᴇʀ ʏᴏᴜʀ ɴᴜᴍʙᴇʀ\n`;
        repoText += `┃    ɪɴ ᴛʜᴇ ɴᴜᴍʙᴇʀ ғɪᴇʟᴅ\n`;
        repoText += `┃ 5️⃣ ᴄᴏᴘʏ ᴛʜᴇ ᴄᴏᴅᴇ ғʀᴏᴍ\n`;
        repoText += `┃    ɴᴏᴛɪғɪᴄᴀᴛɪᴏɴ\n`;
        repoText += `┃ 6️⃣ ᴄʟɪᴄᴋ ᴡʜᴀᴛsᴀᴘᴘ\n`;
        repoText += `┃    ɴᴏᴛɪғɪᴄᴀᴛɪᴏɴ\n`;
        repoText += `┃ 7️⃣ ᴇɴᴛᴇʀ ᴛʜᴇ 𝟾-ᴅɪɢɪᴛ\n`;
        repoText += `┃    ᴄᴏᴅᴇ ᴛʜᴇʀᴇ\n`;
        repoText += `┃ 8️⃣ ᴅᴏɴᴇ! ʙᴏᴛ ɪs ʀᴇᴀᴅʏ 🔥\n`;
        repoText += `┃\n`;
        repoText += `╰━━━━━━━━━━━━━━━━━━━⬣\n\n`;

        repoText += `╭━━━━〔 ⚠️ ɴᴏᴛᴇ ⚠️ 〕━━━━╮\n`;
        repoText += `┃\n`;
        repoText += `┃ • ᴍᴀᴋᴇ sᴜʀᴇ ʏᴏᴜʀ ɴᴜᴍʙᴇʀ\n`;
        repoText += `┃   ʜᴀs ᴡʜᴀᴛsᴀᴘᴘ ɪɴsᴛᴀʟʟᴇᴅ\n`;
        repoText += `┃ • ᴅᴏ ɴᴏᴛ sʜᴀʀᴇ ʏᴏᴜʀ ᴄᴏᴅᴇ\n`;
        repoText += `┃   ᴡɪᴛʜ ᴀɴʏᴏɴᴇ\n`;
        repoText += `┃ • ᴜsᴇ ᴀᴛ ʏᴏᴜʀ ᴏᴡɴ ʀɪsᴋ\n`;
        repoText += `┃\n`;
        repoText += `╰━━━━━━━━━━━━━━━━━━━⬣\n`;
        repoText += `\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ*`;

        const end = new Date().getTime();

        // ─── Send Repo Message ───
        await conn.sendMessage(from, {
            text: repoText,
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
        console.error("Error in repo command:", e);
        reply(`*An error occurred in repo:*\n\`\`\`${e.message}\`\`\``);
    }
});
