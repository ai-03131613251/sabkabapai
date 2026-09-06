// 𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩 - UPGRADED MENU WITH AUDIO & AUTO LOADER
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs'; // File System import for Audio
import config from '../config.js';
import { cmd, commands } from '../command.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Menu Image URL ───
const MENU_IMAGE_URL = 'https://files.catbox.moe/pb5yiz.jpg';

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

// ─── Safe Command Iterator (Auto Loader Logic) ───
function getAllCommands() {
    const list = [];
    try {
        // Check if commands is a Map
        if (commands instanceof Map) {
            commands.forEach((cmdObj, name) => list.push({ name, ...cmdObj }));
        }
        // Check if commands is an Object
        else if (commands && typeof commands === 'object' && !Array.isArray(commands)) {
            for (const name in commands) {
                if (commands.hasOwnProperty(name)) list.push({ name, ...commands[name] });
            }
        }
        // Check if commands is an Array
        else if (Array.isArray(commands)) {
            commands.forEach((cmdObj, index) => {
                list.push({ name: cmdObj.pattern || cmdObj.name || `cmd${index}`, ...cmdObj });
            });
        }
        // Fallback to Global
        else if (typeof global !== 'undefined' && global.commands) {
            const gCmds = global.commands;
            if (gCmds instanceof Map) gCmds.forEach((cmdObj, name) => list.push({ name, ...cmdObj }));
            else if (typeof gCmds === 'object') {
                for (const name in gCmds) {
                    if (gCmds.hasOwnProperty(name)) list.push({ name, ...gCmds[name] });
                }
            }
        }
    } catch (e) {
        console.error("⚠️ Error reading commands:", e);
    }
    return list;
}

cmd({
    pattern: "menu",
    alias: ["help", "cmdlist", "m", "commands"],
    use: '.menu',
    desc: "Show all available commands with categories and background music.",
    category: "main",
    react: "🎵", // Music Note Reaction
    filename: __filename
},

async (conn, mek, m, { from, quoted, sender, pushname, reply }) => {
    try {
        const start = new Date().getTime();

        // 1. Load Commands First (Ensure List is Fresh)
        const allCmds = getAllCommands();
        
        if (allCmds.length === 0) {
            return reply(`*❌ No commands loaded yet! Please wait...*`);
        }

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

        // ─── Organize by Category ───
        const categoryMap = {};
        for (const c of allCmds) {
            const cat = (c.category || 'other').toLowerCase();
            if (!categoryMap[cat]) categoryMap[cat] = [];
            categoryMap[cat].push(c.name || c.pattern || 'unknown');
        }

        const date = new Date().toLocaleDateString('en-GB');
        const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
        const prefix = config.PREFIX || '.';

        // ─── VIP HEADER ───
        let caption = `╭┈───〔 ${botName} 〕┈───⊷\n`;
        caption += `┋ ➠ 👤 *ᴜsᴇʀ:* ${pushname || 'User'}\n`;
        caption += `┋⋄ ➠ ⏰ *ᴛɪᴍ:* ${time}\n`;
        caption += `┋⋄ ➠  *ᴅᴛᴇ:* ${date}\n`;
        caption += `┋⋄ ➠  *ᴘᴇғɪx:* [ ${prefix} ]\n`;
        caption += `┋⋄ ➠ 📊 *ᴄᴍᴅs:* ${allCmds.length}\n`;
        caption += `╰───────────────────⊷\n\n`;

        // ─── VIP CATEGORIES ───
        const sortedCats = Object.keys(categoryMap).sort();
        for (const cat of sortedCats) {
            const cmds = categoryMap[cat];
            const fancyCat = toFancy(cat.toUpperCase());

            caption += `╭───〔 ${fancyCat} 〕┈───⊷\n`;
            
            for (const c of cmds) {
                caption += `┋⋄ ➠ *${c}*\n`;
            }
            
            caption += `╰───────────────────⊷\n\n`;
        }

        // ─── VIP FOOTER ───
        caption += `╭┈───〔 ${textEmoji} ɪɴғᴏ ${textEmoji} 〕┈───⊷\n`;
        caption += `┋ ➠ ᴛʏᴘᴇ ${prefix}help <cmd>\n`;
        caption += `┋⋄ ➠ ғᴏʀ ᴄᴏᴍᴍɴᴅ ᴅᴛᴀʟs\n`;
        caption += `╰───────────────────⊷\n`;
        caption += `\n> *© ᴘᴏᴡᴇʀᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐀ᴅᴇʟ*`;

        // ─── Send Image + Caption First ───
        await conn.sendMessage(from, {
            image: { url: MENU_IMAGE_URL },
            caption: caption,
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

        // ─── Send Audio (Song) Immediately After ───
        const audioPath = path.join(__dirname, '../assets/menu.mp3');
        
        if (fs.existsSync(audioPath)) {
            const audioBuffer = fs.readFileSync(audioPath);
            
            // Send as Voice Note (PTT) for auto-play feel
            await conn.sendMessage(from, {
                audio: audioBuffer,
                mimetype: 'audio/mp4',
                ptt: true, // True = Voice Note Style, False = Music Player Style
                fileName: 'GhostMD_Menu.mp3',
                contextInfo: {
                    externalAdReply: {
                        title: "🎵 Now Playing",
                        body: `${botName} Theme`,
                        thumbnailUrl: MENU_IMAGE_URL,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: mek });
        } else {
            console.log("⚠️ Audio file 'menu.mp3' not found in assets folder.");
        }

    } catch (e) {
        console.error("Error in menu command:", e);
        reply(`*Error:* \`\`\`${e.message}\`\`\``);
    }
});

// ─── HELP Command (Unchanged but kept for consistency) ───
cmd({
    pattern: "help",
    alias: ["cmdinfo", "cmddetails"],
    use: '.help <command>',
    desc: "Get detailed info about a specific command.",
    category: "main",
    react: "❓",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, args, q, reply }) => {
    try {
        if (!q) return reply(`*⚠️ ᴘʟᴀs ᴘʀᴏᴠɪᴅᴇ  ᴄᴏᴍᴀɴ ɴᴀᴍᴇ!*\n\n*ᴇxᴀᴍʟᴇ:* ${config.PREFIX || '.'}help ping`);
        
        const query = q.toLowerCase().trim();
        const allCmds = getAllCommands();
        let foundCmd = null;
        let foundName = '';

        for (const c of allCmds) {
            const cmdName = (c.name || c.pattern || '').toLowerCase();
            if (cmdName === query) { foundCmd = c; foundName = c.name || c.pattern; break; }
            const aliases = c.alias || [];
            if (Array.isArray(aliases) && aliases.some(a => a.toLowerCase() === query)) { foundCmd = c; foundName = c.name || c.pattern; break; }
        }

        if (!foundCmd) return reply(`*❌ ᴄᴏᴍᴍɴᴅ ɴᴛ ғᴏᴜɴᴅ!*`);

        let helpText = `╭┈───〔 ${botName} 〕┈───⊷\n`;
        helpText += `┋⋄ ➠ *ᴄᴏᴍᴍɴᴅ:* ${foundName}\n`;
        helpText += `┋⋄ ➠ *ᴄᴀᴛᴇɢᴏʀʏ:* ${(foundCmd.category || 'other').toUpperCase()}\n`;
        helpText += `┋⋄ ➠ *ᴅᴇsᴄʀɪᴛɪɴ:* ${foundCmd.desc || 'No description'}\n`;
        helpText += `┋⋄ ➠ *ᴜsᴀɢ:* ${foundCmd.use || `.${foundName}`}\n`;
        helpText += `╰───────────────────⊷\n`;
        helpText += `\n> *© ᴘᴡᴇʀᴇ ʙʏ 𝐌ᴀғɪᴀ ᴅᴇᴇʟ*`;

        await conn.sendMessage(from, { text: helpText }, { quoted: mek });

    } catch (e) {
        reply(`*Error:* \`\`\`${e.message}\`\`\``);
    }
});
