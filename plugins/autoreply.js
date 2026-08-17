// 𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import { cmd } from '../command.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const botName = "𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩";

// ─── State ───
let autoReplyEnabled = false;
const userCooldown = new Map(); // Prevent spam
const COOLDOWN_MS = 5000; // 5 seconds per user

// ─── Default Auto Replies (Most Used Words) ───
const defaultReplies = new Map([
    ['hello', '👋 ʜᴇʟʟᴏ! ʜᴏᴡ ᴄᴀɴ ɪ ʜᴇʟᴘ ʏᴏᴜ?'],
    ['hi', '🔥 ʜɪ ᴛʜᴇʀᴇ! ᴡʜᴀᴛ\'s ᴜᴘ?'],
    ['hey', '⚡ ʜᴇʏ! ʀᴇᴀᴅʏ ᴛᴏ ʀᴏᴄᴋ?'],
    ['assalamualaikum', '🌙 ᴡᴀʟᴀɪᴋᴜᴍ ᴀssᴀʟᴀᴍ!'],
    ['salam', '🌙 ᴡᴀʟᴀɪᴋᴜᴍ ᴀssᴀʟᴀᴍ!'],
    ['bot', '🤖 ʏᴇs, ɪ\'ᴍ ᴏɴʟɪɴᴇ ᴀɴᴅ ʀᴇᴀᴅʏ!'],
    ['alive', '✅ ʏᴇs! ʙᴏᴛ ɪs ᴀʟɪᴠᴇ ᴀɴᴅ ʀᴜɴɴɪɴɢ!'],
    ['owner', '👑 ᴏᴡɴᴇʀ: 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ\n📞 923131613251'],
    ['menu', '📜 ᴛʏᴘᴇ *.ᴍᴇɴᴜ* ᴛᴏ sᴇᴇ ᴀʟʟ ᴄᴏᴍᴍᴀɴᴅs!'],
    ['help', '❓ ᴛʏᴘᴇ *.ʜᴇʟᴘ <ᴄᴍᴅ>* ғᴏʀ ᴅᴇᴛᴀɪʟs!'],
    ['repo', '📂 ᴛʏᴘᴇ *.ʀᴇᴘᴏ* ғᴏʀ ʙᴏᴛ ʟɪɴᴋ!'],
    ['ping', '⚡ ᴛʏᴘᴇ *.ᴘɪɴɢ* ᴛᴏ ᴄʜᴇᴄᴋ sᴘᴇᴇᴅ!'],
    ['thanks', '🙏 ʏᴏᴜ\'ʀᴇ ᴡᴇʟᴄᴏᴍᴇ!'],
    ['shukriya', '🙏 ᴋᴏɪ ʙᴀᴀᴛ ɴᴀʜɪɴ!'],
    ['bye', '👋 ʙʏᴇ! ᴛᴀᴋᴇ ᴄᴀʀᴇ!'],
    ['goodnight', '🌙 ɢᴏᴏᴅ ɴɪɢʜᴛ! sᴡᴇᴇᴛ ᴅʀᴇᴀᴍs!'],
    ['goodmorning', '☀️ ɢᴏᴏᴅ ᴍᴏʀɴɪɴɢ! ʜᴀᴠᴇ ᴀ ɢʀᴇᴀᴛ ᴅᴀʏ!'],
    ['link', '🔗 ᴍɪɴɪ ʙᴏᴛ: https://ghost-mini-bot.vercel.app/'],
    ['number', '📞 ᴏᴡɴᴇʀ: 923131613251'],
    ['status', '📊 ᴛʏᴘᴇ *.sᴇʀᴠᴇʀ* ᴏʀ *.ᴀʟɪᴠᴇ*!'],
    ['speed', '⚡ ᴛʏᴘᴇ *.ᴘɪɴɢ* ᴛᴏ ᴄʜᴇᴄᴋ!'],
    ['mashaallah', '🤲 ᴍᴀ sʜᴀᴀ ᴀʟʟᴀʜ!'],
    ['subhanallah', '🤲 sᴜʙʜᴀᴀɴ ᴀʟʟᴀʜ!'],
    ['inshallah', '🤲 ɪɴ sʜᴀᴀ ᴀʟʟᴀʜ!'],
    ['ok', '👍 ᴏᴋᴀʏ!'],
    ['done', '✅ ᴅᴏɴᴇ!'],
    ['wow', '🤩 ᴡᴏᴡ!'],
    ['lol', '😂 ʟᴏʟ!'],
    ['haha', '😂 ʜᴀʜᴀ!'],
    ['nice', '🔥 ɴɪᴄᴇ!'],
    ['bad', '💀 ᴏᴏᴘs!'],
    ['sorry', '😔 ɪᴛ\'s ᴏᴋᴀʏ!'],
    ['love', '❤️ ʟᴏᴠᴇ ʏᴏᴜ ᴛᴏᴏ!'],
    ['bhai', '💀 ʜᴀɴ ʙʜᴀɪ, ʙᴏʟᴏ!'],
    ['bhot', '🔥 ʙᴏʜᴏᴛ ᴀʟᴀɢ ʟᴇᴠᴇʟ!'],
    ['test', '✅ ʙᴏᴛ ɪs ᴡᴏʀᴋɪɴɢ ᴘᴇʀғᴇᴄᴛʟʏ!'],
    ['start', '🚀 ᴡᴇʟᴄᴏᴍᴇ! ᴛʏᴘᴇ *.ᴍᴇɴᴜ* ᴛᴏ sᴛᴀʀᴛ!']
]);

// Custom replies (user added)
const customReplies = new Map();

// ─── Get Combined Replies ───
function getReplies() {
    return new Map([...defaultReplies, ...customReplies]);
}

// ─── Check Cooldown ───
function checkCooldown(userId) {
    const now = Date.now();
    const last = userCooldown.get(userId) || 0;
    if (now - last < COOLDOWN_MS) return false;
    userCooldown.set(userId, now);
    return true;
}

// ─── Main Auto Reply Handler ───
// Call this from your main bot message handler for ALL messages
export async function checkAutoReply(conn, mek, m, text, from, sender) {
    if (!autoReplyEnabled) return false;
    if (!text || !from || !sender) return false;

    const prefix = config.PREFIX || '.';
    
    // Don't reply to commands (messages starting with prefix)
    if (text.trim().startsWith(prefix)) return false;
    
    // Don't reply to own messages
    if (mek.key.fromMe) return false;

    const lowerText = text.toLowerCase().trim();
    const replies = getReplies();

    // Check for exact match or word inclusion
    for (const [keyword, replyText] of replies) {
        if (lowerText === keyword || lowerText.includes(keyword)) {
            
            // Cooldown check
            if (!checkCooldown(sender)) return false;

            // Send reply
            await conn.sendMessage(from, {
                text: replyText,
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
            
            return true; // Replied
        }
    }
    
    return false; // No match
}

// ─── Management Command ───
cmd({
    pattern: "autoreply",
    alias: ["ar", "auto", "replybot"],
    use: '.autoreply on/off/add/del/list',
    desc: "Manage auto reply system.",
    category: "owner",
    react: "🤖",
    filename: __filename
},

async (conn, mek, m, { from, sender, args, q, isOwner, reply }) => {
    try {
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

        if (!isOwner) {
            return reply(`*❌ ᴏɴʟʏ ʙᴏᴛ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs!*`);
        }

        const subCmd = (args[0] || '').toLowerCase();
        const prefix = config.PREFIX || '.';

        // ─── ON ───
        if (subCmd === 'on') {
            autoReplyEnabled = true;
            
            let onText = `╭┈───〔 ${botName} 〕┈───⊷\n`;
            onText += `┋⋄ ➠ ✅ *ᴀᴜᴛᴏ ʀᴇᴘʟʏ ᴇɴᴀʙʟᴇᴅ!*\n`;
            onText += `┋⋄ ➠ 🤖 ʙᴏᴛ ᴡɪʟʟ ɴᴏᴡ ᴀᴜᴛᴏ ʀᴇᴘʟʏ\n`;
            onText += `┋⋄ ➠ 📊 ᴛᴏᴛᴀʟ ᴋᴇʏᴡᴏʀᴅs: ${getReplies().size}\n`;
            onText += `┋⋄ ➠ ⏱️ ᴄᴏᴏʟᴅᴏᴡɴ: ${COOLDOWN_MS/1000}s\n`;
            onText += `╰───────────────────⊷\n`;
            onText += `\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ*`;
            
            return reply(onText);
        }

        // ─── OFF ───
        if (subCmd === 'off') {
            autoReplyEnabled = false;
            
            let offText = `╭┈───〔 ${botName} 〕┈───⊷\n`;
            offText += `┋⋄ ➠ 🔴 *ᴀᴜᴛᴏ ʀᴇᴘʟʏ ᴅɪsᴀʙʟᴇᴅ!*\n`;
            offText += `┋⋄ ➠ 🤖 ʙᴏᴛ ᴡɪʟʟ ɴᴏᴛ ᴀᴜᴛᴏ ʀᴇᴘʟʏ ɴᴏᴡ\n`;
            offText += `╰───────────────────⊷\n`;
            offText += `\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ*`;
            
            return reply(offText);
        }

        // ─── ADD ───
        if (subCmd === 'add') {
            if (!args[1] || !args[2]) {
                return reply(`*⚠️ ᴜsᴀɢᴇ:*\n${prefix}autoreply add <ᴋᴇʏᴡᴏʀᴅ> <ʀᴇᴘʟʏ>\n\n*ᴇxᴀᴍᴘʟᴇ:*\n${prefix}autoreply add hello ʜᴇʟʟᴏ ᴛʜᴇʀᴇ!`);
            }
            
            const keyword = args[1].toLowerCase();
            const replyMsg = args.slice(2).join(' ');
            customReplies.set(keyword, replyMsg);
            
            return reply(`*✅ ᴀᴅᴅᴇᴅ!*\n\n🔤 *ᴋᴇʏᴡᴏʀᴅ:* ${keyword}\n💬 *ʀᴇᴘʟʏ:* ${replyMsg}`);
        }

        // ─── DEL ───
        if (subCmd === 'del') {
            if (!args[1]) {
                return reply(`*⚠️ ᴜsᴀɢᴇ:*\n${prefix}autoreply del <ᴋᴇʏᴡᴏʀᴅ>`);
            }
            
            const keyword = args[1].toLowerCase();
            if (customReplies.has(keyword)) {
                customReplies.delete(keyword);
                return reply(`*✅ ᴅᴇʟᴇᴛᴇᴅ!*\n\n🔤 *ᴋᴇʏᴡᴏʀᴅ:* ${keyword}`);
            } else {
                return reply(`*❌ ᴋᴇʏᴡᴏʀᴅ ɴᴏᴛ ғᴏᴜɴᴅ!*`);
            }
        }

        // ─── LIST ───
        if (subCmd === 'list') {
            const allReplies = getReplies();
            let listText = `╭┈───〔 🤖 ᴀᴜᴛᴏ ʀᴇᴘʟʏ ʟɪsᴛ 〕┈───⊷\n`;
            listText += `┋⋄ ➠ 📊 *ᴛᴏᴛᴀʟ:* ${allReplies.size}\n`;
            listText += `┋⋄ ➠ 📡 *sᴛᴀᴛᴜs:* ${autoReplyEnabled ? '🟢 ON' : '🔴 OFF'}\n`;
            listText += `╰───────────────────⊷\n\n`;
            
            let count = 1;
            for (const [key, val] of allReplies) {
                listText += `${count}. *${key}* → ${val.substring(0, 20)}${val.length > 20 ? '...' : ''}\n`;
                count++;
                if (count > 30) {
                    listText += `...and ${allReplies.size - 30} more`;
                    break;
                }
            }
            
            listText += `\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ*`;
            return reply(listText);
        }

        // ─── STATUS / DEFAULT ───
        let statusText = `╭┈───〔 🤖 ᴀᴜᴛᴏ ʀᴇᴘʟʏ 〕┈───⊷\n`;
        statusText += `┋⋄ ➠ 📡 *sᴛᴀᴛᴜs:* ${autoReplyEnabled ? '🟢 ON' : '🔴 OFF'}\n`;
        statusText += `┋⋄ ➠ 📊 *ᴋᴇʏᴡᴏʀᴅs:* ${getReplies().size}\n`;
        statusText += `┋⋄ ➠ ⏱️ *ᴄᴏᴏʟᴅᴏᴡɴ:* ${COOLDOWN_MS/1000}s\n`;
        statusText += `╰───────────────────⊷\n\n`;
        statusText += `*ᴜsᴀɢᴇ:*\n`;
        statusText += `┋⋄ ➠ ${prefix}autoreply on\n`;
        statusText += `┋⋄ ➠ ${prefix}autoreply off\n`;
        statusText += `┋⋄ ➠ ${prefix}autoreply add <ᴡᴏʀᴅ> <ʀᴇᴘʟʏ>\n`;
        statusText += `┋⋄ ➠ ${prefix}autoreply del <ᴡᴏʀᴅ>\n`;
        statusText += `┋⋄ ➠ ${prefix}autoreply list\n`;
        statusText += `\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ*`;
        
        return reply(statusText);

    } catch (e) {
        console.error("Error in autoreply command:", e);
        reply(`*Error:* \`\`\`${e.message}\`\`\``);
    }
});
