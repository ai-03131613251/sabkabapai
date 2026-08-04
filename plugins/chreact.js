// 𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import { cmd } from '../command.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const botName = "𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩";

cmd({
    pattern: "chreact",
    alias: ["channelreact", "creact", "newsletterreact", "chreaction"],
    use: '.chreact <channel_jid> <msg_id> <emoji>',
    desc: "React to a WhatsApp channel/newsletter post.",
    category: "main",
    react: "❤️",
    filename: __filename
},

async (conn, mek, m, { from, args, q, sender, reply }) => {
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

        const prefix = config.PREFIX || '.';

        // ─── Parse Arguments ───
        if (!q || args.length < 2) {
            return reply(`*⚠️ ᴜsᴀɢᴇ:*\n${prefix}chreact <ᴄʜᴀɴɴᴇʟ_ᴊɪᴅ> <ᴍsɢ_ɪᴅ> <ᴇᴍᴏᴊɪ>\n\n*ᴇxᴀᴍᴘʟᴇ:*\n${prefix}chreact 120363404811118873@newsletter 143 🔥`);
        }

        const channelJid = args[0];
        const msgId = args[1];
        const emoji = args[2] || '❤️';

        // ─── Validate JID ───
        if (!channelJid.includes('@newsletter') && !channelJid.includes('@broadcast')) {
            return reply(`*❌ ɪɴᴠᴀʟɪᴅ ᴄʜᴀɴɴᴇʟ ᴊɪᴅ!*\n\nᴜsᴇ ғᴏʀᴍᴀᴛ: *123456789@newsletter*`);
        }

        // ─── Construct Message Key ───
        const messageKey = {
            remoteJid: channelJid,
            fromMe: false,
            id: msgId,
            participant: undefined
        };

        // ─── Send Reaction ───
        await conn.sendMessage(channelJid, {
            react: { text: emoji, key: messageKey }
        });

        const end = new Date().getTime();
        const responseTime = ((end - start) / 1000).toFixed(2);

        // ─── Success Message ───
        let doneText = `╭━━━━━━━━━━━━━━╮\n`;
        doneText += `┃  ${botName}\n`;
        doneText += `╰━━━━━━━━━━━━━━━⬣\n\n`;
        doneText += `╭━〔 ❤️ ᴄʜᴀɴɴᴇʟ ʀᴇᴀᴄᴛ ❤️ 〕━╮\n`;
        doneText += `┃\n`;
        doneText += `┃  ✅ *ʀᴇᴀᴄᴛᴇᴅ sᴜᴄᴄᴇssғᴜʟʟʏ!*\n`;
        doneText += `┃\n`;
        doneText += `┃  📢 *ᴄʜᴀɴɴᴇʟ:* ${channelJid}\n`;
        doneText += `┃  🆔 *ᴍsɢ ɪᴅ:* ${msgId}\n`;
        doneText += `┃  😍 *ᴇᴍᴏᴊɪ:* ${emoji}\n`;
        doneText += `┃  ⚡ *sᴘᴇᴇᴅ:* ${responseTime}ms\n`;
        doneText += `┃\n`;
        doneText += `╰━━━━━━━━━━━━━━━⬣\n`;
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
        console.error("Error in chreact command:", e);
        reply(`*❌ ʀᴇᴀᴄᴛɪᴏɴ ғᴀɪʟᴇᴅ!*\n\n*ʀᴇᴀsᴏɴ:* ${e.message}\n\n*ᴛɪᴘ:* ᴍᴀᴋᴇ sᴜʀᴇ ʙᴏᴛ ɪs ғᴏʟʟᴏᴡɪɴɢ ᴛʜᴇ ᴄʜᴀɴɴᴇʟ ᴀɴᴅ ᴍsɢ_ɪᴅ ɪs ᴄᴏʀʀᴇᴄᴛ.`);
    }
});
