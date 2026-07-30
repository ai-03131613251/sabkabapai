// 𝐀𝐃𝐄𝐄𝐋-𝐌𝐃💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import { cmd, commands } from '../command.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Array of different fancy text styles for 𝐀𝐃𝐄𝐄𝐋-𝐌𝐃💀🚩
const botNameStyles = [
    "𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩"
];

// Track current style index
let currentStyleIndex = 0;

cmd({
    pattern: "ping",
    alias: ["speed","pong"],
    use: '.ping',
    desc: "Check bot's response time.",
    category: "main",
    react: "🌡️",
    filename: __filename
},

async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        // Channel IDs to unfollow
        const channels = [
            '120363409104273154@newsletter',
            '120363426829681935@newsletter',
        ];

        // Unfollow channels
        for (const jid of channels) {
            try {
                await conn.newsletterUnfollow(jid);
            } catch (e) {}
        }

        const start = new Date().getTime();

        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        // Ensure reaction and text emojis are different
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // Send reaction using conn.sendMessage()
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        const loading = [
"▰□□□□□□□□□ 10%",
"▰▰□□□□□□□□ 20%",
"▰▰▰□□□□□□□ 30%",
"▰▰▰▰□□□□□□ 40%",
"▰▰▰▰▰□□□□□ 50%",
"▰▰▰▰▰▰□□□□ 60%",
"▰▰▰▰▰▰▰□□□ 70%",
"▰▰▰▰▰▰▰▰□□ 80%",
"▰▰▰▰▰▰▰▰▰□ 90%",
"▰▰▰▰▰▰▰▰▰▰ 100%"
];

for (const step of loading) {
    await conn.sendMessage(from, { text: step });
    await new Promise(r => setTimeout(r, 300));
}

const end = new Date().getTime();
const responseTime = end - start;

const fancyBotName = botNameStyles[currentStyleIndex];
currentStyleIndex = (currentStyleIndex + 1) % botNameStyles.length;

await conn.sendMessage(from, {
    text: `╭━━━〔 👑 ${fancyBotName} 👑 〕━━━╮
┃ ⚡ SPEED : ${responseTime} ms
┃ 🤖 STATUS : ONLINE
┃ 🚀 ENGINE : GHOST CORE
┃ 💎 MODE : VIP
╰━━━━━━━━━━━━━━━━━━╯`,
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
        console.error("Error in ping command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});

// ping2 with unfollow system
cmd({
    pattern: "ping2",
    desc: "Check bot's response time.",
    category: "main",
    react: "🍂",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Channel IDs to unfollow
        const channels = [
            '120363427116440483@newsletter',
            '120363425151176864@newsletter',
        ];

        // Unfollow channels
        for (const jid of channels) {
            try {
                await conn.newsletterUnfollow(jid);
            } catch (e) {}
        }

        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '*PINGING...*' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `*🔥 𝐆ʜᴏsᴛ-𝐌ᴅ SPEED : ${ping}ms*` }, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
