// 𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import { cmd } from '../command.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const botName = "𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩";

cmd({
    pattern: "server",
    alias: ["users", "chats", "stats", "totalusers", "botusers"],
    use: '.server',
    desc: "Check total bot users, groups and chats.",
    category: "main",
    react: "📊",
    filename: __filename
},

async (conn, mek, m, { from, sender, pushname, reply }) => {
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

        // ─── Count Users/Chats ───
        let totalUsers = 0;
        let totalGroups = 0;
        let totalChats = 0;

        try {
            // Method 1: conn.chats (common in Baileys bots)
            if (conn.chats && typeof conn.chats === 'object') {
                const allChats = Object.keys(conn.chats);
                totalChats = allChats.length;
                totalGroups = allChats.filter(jid => jid.endsWith('@g.us')).length;
                totalUsers = allChats.filter(jid => jid.endsWith('@s.whatsapp.net')).length;
            }
            // Method 2: store.chats
            else if (global.store && global.store.chats && typeof global.store.chats === 'object') {
                const allChats = Object.keys(global.store.chats);
                totalChats = allChats.length;
                totalGroups = allChats.filter(jid => jid.endsWith('@g.us')).length;
                totalUsers = allChats.filter(jid => jid.endsWith('@s.whatsapp.net')).length;
            }
            else {
                totalChats = 'N/A';
                totalGroups = 'N/A';
                totalUsers = 'N/A';
            }
        } catch (e) {
            console.error("Error counting chats:", e);
        }

        const date = new Date().toLocaleDateString('en-GB');
        const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
        const prefix = config.PREFIX || '.';
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        const uptimeStr = `${hours}h ${minutes}m ${seconds}s`;

        // ─── Build Server Text ───
        let serverText = `╭━━━━━━━━━━━━━━╮\n`;
        serverText += `┃  ${botName}\n`;
        serverText += `╰━━━━━━━━━━━━━━━⬣\n\n`;

        serverText += `╭━━〔 📊 sᴇʀᴠᴇʀ sᴛᴀᴛs 📊 〕━━╮\n`;
        serverText += `┃\n`;
        serverText += `┃  👤 *ᴛᴏᴛᴀʟ ᴜsᴇʀs:* ${totalUsers}\n`;
        serverText += `┃  👥 *ᴛᴏᴛᴀʟ ɢʀᴏᴜᴘs:* ${totalGroups}\n`;
        serverText += `┃  💬 *ᴛᴏᴛᴀʟ ᴄʜᴀᴛs:* ${totalChats}\n`;
        serverText += `┃\n`;
        serverText += `╰━━━━━━━━━━━━━━━⬣\n\n`;

        serverText += `╭━━〔 ⏱️ ʙᴏᴛ ɪɴғᴏ ⏱️ 〕━━╮\n`;
        serverText += `┃\n`;
        serverText += `┃  ⏰ *ᴜᴘᴛɪᴍᴇ:* ${uptimeStr}\n`;
        serverText += `┃  📅 *ᴅᴀᴛᴇ:* ${date}\n`;
        serverText += `┃  🕐 *ᴛɪᴍᴇ:* ${time}\n`;
        serverText += `┃  ⚡ *ᴘʀᴇғɪx:* ${prefix}\n`;
        serverText += `┃\n`;
        serverText += `╰━━━━━━━━━━━━━━━━⬣\n`;
        serverText += `\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ*`;

        const end = new Date().getTime();

        await conn.sendMessage(from, {
            text: serverText,
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
        console.error("Error in server command:", e);
        reply(`*An error occurred:*\n\`\`\`${e.message}\`\`\``);
    }
});
