// 𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import { cmd, commands } from '../command.js';
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

// ─── Categories ───
const categories = {
    'main': { icon: '⚙️', name: 'MAIN' },
    'owner': { icon: '👑', name: 'OWNER' },
    'group': { icon: '👥', name: 'GROUP' },
    'download': { icon: '📥', name: 'DOWNLOAD' },
    'search': { icon: '🔍', name: 'SEARCH' },
    'fun': { icon: '🎭', name: 'FUN' },
    'tools': { icon: '🛠️', name: 'TOOLS' },
    'convert': { icon: '🔄', name: 'CONVERT' },
    'sticker': { icon: '🎨', name: 'STICKER' },
    'ai': { icon: '🤖', name: 'AI' },
    'admin': { icon: '🛡️', name: 'ADMIN' },
    'user': { icon: '👤', name: 'USER' },
    'media': { icon: '📹', name: 'MEDIA' },
    'game': { icon: '🎮', name: 'GAME' },
    'info': { icon: 'ℹ️', name: 'INFO' },
    'other': { icon: '📦', name: 'OTHER' }
};

// ─── Safe Command Iterator ───
function getAllCommands() {
    const list = [];
    
    try {
        // Case 1: commands is a Map
        if (commands instanceof Map) {
            commands.forEach((cmdObj, name) => {
                list.push({ name, ...cmdObj });
            });
        }
        // Case 2: commands is an Object {}
        else if (commands && typeof commands === 'object' && !Array.isArray(commands)) {
            for (const name in commands) {
                if (commands.hasOwnProperty(name)) {
                    list.push({ name, ...commands[name] });
                }
            }
        }
        // Case 3: commands is an Array
        else if (Array.isArray(commands)) {
            commands.forEach((cmdObj, index) => {
                list.push({ name: cmdObj.pattern || cmdObj.name || `cmd${index}`, ...cmdObj });
            });
        }
        // Case 4: global.commands or cmd.commands
        else if (typeof global !== 'undefined' && global.commands) {
            const gCmds = global.commands;
            if (gCmds instanceof Map) {
                gCmds.forEach((cmdObj, name) => list.push({ name, ...cmdObj }));
            } else if (typeof gCmds === 'object') {
                for (const name in gCmds) {
                    if (gCmds.hasOwnProperty(name)) list.push({ name, ...gCmds[name] });
                }
            }
        }
    } catch (e) {
        console.error("Error reading commands:", e);
    }
    
    return list;
}

cmd({
    pattern: "menu",
    alias: ["help", "cmdlist", "list", "commands"],
    use: '.menu',
    desc: "Show all available commands with categories.",
    category: "main",
    react: "📜",
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

        // ─── Get Commands Safely ───
        const allCmds = getAllCommands();
        
        if (allCmds.length === 0) {
            return reply(`*❌ No commands found!*\n\nCommands object type: ${typeof commands}`);
        }

        // ─── Organize by Category ───
        const categoryMap = {};
        for (const c of allCmds) {
            const cat = (c.category || 'other').toLowerCase();
            if (!categoryMap[cat]) categoryMap[cat] = [];
            categoryMap[cat].push({
                name: c.name || c.pattern || 'unknown',
                desc: c.desc || 'No description',
                use: c.use || `.${c.name || c.pattern || 'cmd'}`
            });
        }

        // ─── Build Menu ───
        const date = new Date().toLocaleDateString('en-GB');
        const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
        const prefix = config.PREFIX || '.';

        let menuText = `╭━━━〔 ${botName} 〕━━━⊷\n`;
        menuText += `┃▸╭───────────\n`;
        menuText += `┃▸┃ 👤 *User:* ${pushname || 'User'}\n`;
        menuText += `┃▸┃ ⏰ *Time:* ${time}\n`;
        menuText += `┃▸┃ 📅 *Date:* ${date}\n`;
        menuText += `┃▸┃ ⚡ *Prefix:* [ ${prefix} ]\n`;
        menuText += `┃▸┃ 📊 *Cmds:* ${allCmds.length}\n`;
        menuText += `┃▸╰───────────\n`;
        menuText += `╰━━━━━━━━━━━━━━━⊷\n\n`;

        const sortedCats = Object.keys(categoryMap).sort();
        for (const cat of sortedCats) {
            const catInfo = categories[cat] || categories['other'];
            const cmds = categoryMap[cat];

            menuText += `╭━━〔 ${catInfo.icon} ${toFancy(catInfo.name)} 〕━━⊷\n`;
            menuText += `┃\n`;
            
            for (const c of cmds) {
                menuText += `┃◈ ${c.use}\n`;
                menuText += `┃   └─ ${c.desc}\n`;
            }
            
            menuText += `┃\n`;
            menuText += `╰━━━━━━━━━━━━━━⊷\n\n`;
        }

        menuText += `╭━━━〔 ${textEmoji} INFO ${textEmoji} 〕━━━⊷\n`;
        menuText += `┃▸ *Type ${prefix}help <cmd>*\n`;
        menuText += `┃▸ *for command details*\n`;
        menuText += `╰━━━━━━━━━━━━━━━━━━⊷\n`;
        menuText += `\n> *${botName}* ${reactionEmoji}`;

        const end = new Date().getTime();
        const responseTime = ((end - start) / 1000).toFixed(2);

        await conn.sendMessage(from, {
            text: menuText,
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
        console.error("Error in menu command:", e);
        reply(`*An error occurred in menu:*\n\`\`\`${e.message}\`\`\``);
    }
});

// ─── HELP Command ───
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

        if (!q) {
            return reply(`*⚠️ Please provide a command name!*\n\n*Example:* ${config.PREFIX || '.'}help ping`);
        }

        const query = q.toLowerCase().trim();
        const allCmds = getAllCommands();
        let foundCmd = null;
        let foundName = '';

        for (const c of allCmds) {
            const cmdName = (c.name || c.pattern || '').toLowerCase();
            if (cmdName === query) {
                foundCmd = c;
                foundName = c.name || c.pattern;
                break;
            }
            const aliases = c.alias || [];
            if (Array.isArray(aliases) && aliases.some(a => a.toLowerCase() === query)) {
                foundCmd = c;
                foundName = c.name || c.pattern;
                break;
            }
        }

        if (!foundCmd) {
            return reply(`*❌ Command not found!*\n\n*Type ${config.PREFIX || '.'}menu to see all commands.*`);
        }

        let helpText = `╭━━━〔 ${botName} 〕━━━⊷\n`;
        helpText += `┃\n`;
        helpText += `┃◈ *Command:* ${foundName}\n`;
        helpText += `┃◈ *Category:* ${(foundCmd.category || 'other').toUpperCase()}\n`;
        helpText += `┃◈ *Description:* ${foundCmd.desc || 'No description'}\n`;
        helpText += `┃◈ *Usage:* ${foundCmd.use || `.${foundName}`}\n`;
        helpText += `┃◈ *React:* ${foundCmd.react || 'None'}\n`;
        
        const aliases = foundCmd.alias || [];
        helpText += `┃◈ *Aliases:* ${Array.isArray(aliases) && aliases.length > 0 ? aliases.join(', ') : 'None'}\n`;
        
        helpText += `┃\n`;
        helpText += `╰━━━━━━━━━━━━━━━⊷\n`;
        helpText += `\n> *${botName}* ${reactionEmoji}`;

        const end = new Date().getTime();

        await conn.sendMessage(from, {
            text: helpText,
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
        console.error("Error in help command:", e);
        reply(`*An error occurred in help:*\n\`\`\`${e.message}\`\`\``);
    }
});
