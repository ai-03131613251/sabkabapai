// 𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import { cmd } from '../command.js';
import axios from 'axios';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const botName = "𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩";
const API_BASE_URL = 'https://lai-gd-pfffsi.vercel.app/api';

cmd({
    pattern: 'pair',
    alias: ['getpair', 'clonebot', 'code'],
    react: '✅',
    desc: 'Get pairing code for bot',
    category: 'owner',
    use: '.pair 923131613251',
    filename: __filename
}, async (conn, mek, m, { from, sender, q, senderNumber, reply }) => {
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

        const phoneNumber = q
            ? q.trim().replace(/[^0-9]/g, '')
            : senderNumber.replace(/[^0-9]/g, '');

        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            return await reply(`*❌ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴠᴀʟɪᴅ ᴘʜᴏɴᴇ ɴᴜᴍʙᴇʀ!*\n\n*ᴇxᴀᴍᴘʟᴇ:*\n${config.PREFIX || '.'}pair 923131613251`);
        }

        const randomResponse = await axios.get(`${API_BASE_URL}/random`, { timeout: 5000 });

        if (!randomResponse.data || !randomResponse.data.server) {
            return await reply('*❌ ғᴀɪʟᴇᴅ ᴛᴏ ɢᴇᴛ ᴀᴠᴀɪʟᴀʙʟᴇ sᴇʀᴠᴇʀ!*');
        }

        const selectedServer = randomResponse.data.server;

        const response = await axios.get(`${API_BASE_URL}/code`, {
            params: { server: selectedServer, number: phoneNumber },
            timeout: 20000
        });

        if (!response.data || !response.data.code) {
            return await reply('*❌ ғᴀɪʟᴇᴅ ᴛᴏ ʀᴇᴛʀɪᴇᴠᴇ ᴘᴀɪʀɪɴɢ ᴄᴏᴅᴇ!*');
        }

        const pairingCode = response.data.code;

        let pairText = `╭━━━〔 ${botName} 〕━━━⊷\n\n`;
        pairText += `╭━━━━〔 🔐 ᴘᴀɪʀ ᴄᴏᴅᴇ 🔐 〕━━━━╮\n`;
        pairText += `┃\n`;
        pairText += `┃  🔢 *ᴄᴏᴅᴇ:* ${pairingCode}\n`;
        pairText += `┃  🌐 *sᴇʀᴠᴇʀ:* ${selectedServer}\n`;
        pairText += `┃\n`;
        pairText += `┃  📱 *ʜᴏᴡ ᴛᴏ ᴜsᴇ:*\n`;
        pairText += `┃  1️⃣ ᴏᴘᴇɴ ᴡʜᴀᴛsᴀᴘᴘ\n`;
        pairText += `┃  2️⃣ ɢᴏ ᴛᴏ ʟɪɴᴋᴇᴅ ᴅᴇᴠɪᴄᴇs\n`;
        pairText += `┃  3️⃣ ᴛᴀᴘ ʟɪɴᴋ ᴀ ᴅᴇᴠɪᴄᴇ\n`;
        pairText += `┃  4️⃣ ᴇɴᴛᴇʀ ᴛʜɪs ᴄᴏᴅᴇ\n`;
        pairText += `┃\n`;
        pairText += `╰━━━━━━━━━━━━━━━━━━━⬣\n`;
        pairText += `\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ*`;

        await conn.sendMessage(from, {
            text: pairText,
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

        await new Promise((resolve) => setTimeout(resolve, 2000));
        await reply(`${pairingCode}`);

    } catch (error) {
        console.error('Pair command error:', error);
        await reply(`*❌ ᴇʀʀᴏʀ:* \`\`\`${error.message}\`\`\``);
    }
});
