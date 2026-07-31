// 𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import { cmd } from '../command.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const botName = "𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩";

cmd({
    pattern: "ping",
    alias: ["speed", "pong", "latency"],
    use: '.ping',
    desc: "Check bot's response time with loading effect.",
    category: "main",
    react: "🌡️",
    filename: __filename
},

async (conn, mek, m, { from, quoted, sender, reply }) => {
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

        // Send reaction
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        // ─── Loading Message ───
        const loadingMsg = await conn.sendMessage(from, {
            text: `╭━━━━━━━━━━━━━━━━━━╮\n┃  ${botName}\n╰━━━━━━━━━━━━━━━━━━━⬣\n\n⏳ *ᴘɪɴɢɪɴɢ...* ${textEmoji}\n\n> *ᴘʟᴇᴀsᴇ ᴡᴀɪᴛ...*`
        }, { quoted: mek });

        // Loading delay effect
        await new Promise(resolve => setTimeout(resolve, 1000));

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;

        // ─── Speed Result ───
        let speedText = `╭━━━━━━━━━━━━━━━━━╮\n`;
        speedText += `┃  ${botName}\n`;
        speedText += `╰━━━━━━━━━━━━━━━━━━━•\n\n`;
        speedText += `╭━━━〔 ⚡ sᴘᴇᴇᴅ ⚡ 〕━━━╮\n`;
        speedText += `┃\n`;
        speedText += `┃  🔥 sᴘᴇᴇᴅ: ${responseTime.toFixed(2)}ms\n`;
        speedText += `┃  ${reactionEmoji}\n`;
        speedText += `┃\n`;
        speedText += `╰━━━━━━━━━━━━━━━━━━━⬣\n`;
        speedText += `\n> *${botName}* ${reactionEmoji}`;

        // Send result (quoted to loading message)
        await conn.sendMessage(from, {
            text: speedText,
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
        }, { quoted: loadingMsg });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`*An error occurred:* \`\`\`${e.message}\`\`\``);
    }
});
