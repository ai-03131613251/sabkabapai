// 𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import { cmd } from '../command.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const botName = "𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩";

cmd({
    pattern: "kickall",
    alias: ["nuke", "removeall", "cleargrp"],
    use: '.kickall',
    desc: "Remove all members from the group (Admin only).",
    category: "group",
    react: "🚷",
    filename: __filename
},

async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, isOwner, participants, reply }) => {
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

        // ─── Checks ───
        if (!isGroup) {
            return reply(`*❌ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ɢʀᴏᴜᴘs!*`);
        }

        if (!isBotAdmins) {
            return reply(`*❌ ɪ ɴᴇᴇᴅ ᴀᴅᴍɪɴ ᴘʀɪᴠɪʟᴇɢᴇs ᴛᴏ ᴋɪᴄᴋ ᴍᴇᴍʙᴇʀs!*`);
        }

        if (!isAdmins && !isOwner) {
            return reply(`*❌ ᴏɴʟʏ ɢʀᴏᴜᴘ ᴀᴅᴍɪɴs ᴏʀ ʙᴏᴛ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs!*`);
        }

        // ─── Get Participants to Kick ───
        const botJid = conn.user.id.split(':')[0] + '@s.whatsapp.net';
        const kickList = participants
            .filter(p => p.id !== botJid)
            .map(p => p.id);

        if (kickList.length === 0) {
            return reply(`*⚠️ ɴᴏ ᴍᴇᴍʙᴇʀs ᴛᴏ ᴋɪᴄᴋ!*`);
        }

        // ─── Kick All ───
        await conn.sendMessage(from, {
            text: `⏳ *ᴋɪᴄᴋɪɴɢ ${kickList.length} ᴍᴇᴍʙᴇʀs...* ${textEmoji}`
        }, { quoted: mek });

        // Remove in batches (WhatsApp limit safety)
        const batchSize = 30;
        for (let i = 0; i < kickList.length; i += batchSize) {
            const batch = kickList.slice(i, i + batchSize);
            try {
                await conn.groupParticipantsUpdate(from, batch, 'remove');
                await new Promise(r => setTimeout(r, 1000)); // delay to avoid ban
            } catch (e) {
                console.error(`Error kicking batch ${i}:`, e);
            }
        }

        const end = new Date().getTime();
        const responseTime = ((end - start) / 1000).toFixed(2);

        // ─── Success Message ───
        let doneText = `╭━━━━━━━━━━━━━━━━╮\n`;
        doneText += `┃  ${botName}\n`;
        doneText += `╰━━━━━━━━━━━━━━━━━⬣\n\n`;
        doneText += `╭━━━〔 🚷 ᴋɪᴄᴋᴀʟʟ 🚷 〕━━━╮\n`;
        doneText += `┃\n`;
        doneText += `┃  ✅ *ᴋɪᴄᴋᴇᴅ:* ${kickList.length} ᴍᴇᴍʙᴇʀs\n`;
        doneText += `┃  ⏱️ *ᴛɪᴍᴇ:* ${responseTime}s\n`;
        doneText += `┃  🔥 *ɢʀᴏᴜᴘ ɴᴜᴋᴇᴅ!*\n`;
        doneText += `┃\n`;
        doneText += `╰━━━━━━━━━━━━━━━━⬣\n`;
        doneText += `\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ*`;

        await conn.sendMessage(from, {
            text: doneText,
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
        console.error("Error in kickall command:", e);
        reply(`*An error occurred:*\n\`\`\`${e.message}\`\`\``);
    }
});
