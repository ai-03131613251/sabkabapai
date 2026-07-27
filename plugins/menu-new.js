import { fileURLToPath } from 'url';
import config from '../config.js';
import { cmd, commands } from '../command.js';
import path from 'path';
import os from 'os';
import fs from 'fs';
import {runtime} from '../lib/functions.js';
import axios from 'axios';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ╔══════════════════════════════════════════════════════════════╗
// ║           𝐆ʜᴏsᴛ-𝐌ᴅ VIP MENU SYSTEM                       ║
// ║           Ultra Premium Design Edition                     ║
// ╚══════════════════════════════════════════════════════════════╝

// Fancy text styles
const toFancy = (text) => {
    const fancyMap = {
        'a':'ᴀ','b':'ʙ','c':'ᴄ','d':'ᴅ','e':'ᴇ','f':'ғ','g':'ɢ','h':'ʜ','i':'ɪ',
        'j':'ᴊ','k':'ᴋ','l':'ʟ','m':'ᴍ','n':'ɴ','o':'ᴏ','p':'ᴘ','q':'ǫ','r':'ʀ',
        's':'s','t':'ᴛ','u':'ᴜ','v':'ᴠ','w':'ᴡ','x':'x','y':'ʏ','z':'ᴢ',
        'A':'ᴀ','B':'ʙ','C':'ᴄ','D':'ᴅ','E':'ᴇ','F':'ғ','G':'ɢ','H':'ʜ','I':'ɪ',
        'J':'ᴊ','K':'ᴋ','L':'ʟ','M':'ᴍ','N':'ɴ','O':'ᴏ','P':'ᴘ','Q':'ǫ','R':'ʀ',
        'S':'s','T':'ᴛ','U':'ᴜ','V':'ᴠ','W':'ᴡ','X':'x','Y':'ʏ','Z':'ᴢ'
    };
    return text.split('').map(c => fancyMap[c] || c).join('');
};

// VIP Category formatter
const formatCategoryVIP = (category, cmds) => {
    const validCmds = cmds.filter(cmd => cmd.pattern && cmd.pattern.trim() !== '');
    if (validCmds.length === 0) return '';

    const catEmojis = {
        'main': '⚡', 'owner': '👑', 'group': '👥', 'download': '📥',
        'music': '🎵', 'video': '🎬', 'search': '🔍', 'fun': '🎮',
        'admin': '🛡️', 'tools': '🛠️', 'ai': '🤖', 'sticker': '🎨',
        'convert': '🔄', ' islamic': '🕌', 'nsfw': '🔞', 'other': '📌'
    };

    const emoji = catEmojis[category.toLowerCase()] || '✨';

    let title = `
┏━━━━━━━━━━━━━━━━━┓
┃  ${emoji} ${toFancy(category.toUpperCase())} ${emoji}  ┃
┗━━━━━━━━━━━━━━━━━┛
`;
    let body = validCmds.map(cmd => {
        const name = cmd.pattern || '';
        const desc = cmd.desc ? cmd.desc.split(' ')[0] : '';
        return `  ▸ .${toFancy(name)} ${desc}`;
    }).join('
');

    return `${title}${body}
`;
};

// Validate image
const validateImage = async (url) => {
    if (!url || typeof url !== 'string') return { valid: false };
    try {
        const response = await axios.get(url, {
            timeout: 10000, maxRedirects: 5, responseType: 'arraybuffer',
            headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'image/*,*/*' },
            validateStatus: (status) => status < 400
        });
        const ct = response.headers['content-type'];
        if (ct && ct.startsWith('image/')) {
            return { valid: true, buffer: Buffer.from(response.data) };
        }
        return { valid: false };
    } catch (e) { return { valid: false }; }
};

cmd({
    pattern: "menu",
    alias: ["m", "help", "allmenu", "fullmenu", "cmd", "list"],
    use: '.menu',
    desc: "Show all bot commands",
    category: "main",
    react: "👻",
    filename: __filename
},
async (conn, mek, m, { from, sender, pushname, reply, userConfig }) => {
    try {
        await conn.sendPresenceUpdate('composing', from);

        const totalCommands = Object.keys(commands).length;

        // Get categories
        const categories = [...new Set(Object.values(commands).map(c => c.category))]
            .filter(cat => cat && cat.trim() !== '' && cat !== 'undefined');

        const categorized = {};
        categories.forEach(cat => {
            const cmds = Object.values(commands).filter(c => c.category === cat)
                .filter(cmd => cmd.pattern && cmd.pattern.trim() !== '');
            if (cmds.length > 0) categorized[cat] = cmds;
        });

        // Build menu sections
        let menuSections = '';
        for (const [cat, cmds] of Object.entries(categorized)) {
            const section = formatCategoryVIP(cat, cmds);
            if (section) menuSections += section;
        }

        // Config values
        const BOT_NAME = userConfig?.BOT_NAME || config.BOT_NAME || "𝐆ʜᴏsᴛ-𝐌ᴅ";
        const OWNER_NAME = userConfig?.OWNER_NAME || config.OWNER_NAME || "Owner";
        const PREFIX = userConfig?.PREFIX || config.PREFIX || ".";
        const MODE = userConfig?.MODE || config.MODE || "public";
        const VERSION = userConfig?.VERSION || config.VERSION || "2.0.0";
        const BOT_IMAGE = userConfig?.BOT_IMAGE || config.BOT_IMAGE || config.BOT_MEDIA_URL;

        const uptime = runtime(process.uptime());
        const platform = os.platform();
        const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        // ═══════════════════════════════════════════════════════
        // VIP MENU DESIGN
        // ═══════════════════════════════════════════════════════
        let dec = `
╭━━━━━━━━━━━━━━━━━━━╮
┃                               
┃   ⚡ 𝐆ʜᴏsᴛ-𝐌ᴅ ⚡          
┃                               
┃   「 ᴠɪᴘ ᴍᴇɴᴜ 」            
┃                               
╰━━━━━━━━━━━━━━━━━━━╯

╭━━━「 ʙᴏᴛ ɪɴғᴏ 」━━━╮
┃
┃ 👤 ᴜsᴇʀ: ${pushname || 'Friend'}
┃ 👑 ᴏᴡɴᴇʀ: ${OWNER_NAME}
┃ 📦 ᴄᴍᴅs: ${totalCommands}
┃ ⏱️ ᴜᴘᴛɪᴍᴇ: ${uptime}
┃ 💾 ʀᴀᴍ: ${ram}MB
┃ 🖥️ ᴘʟᴀᴛғᴏʀᴍ: ${platform}
┃ 🔧 ᴘʀᴇғɪx: ${PREFIX}
┃ ⚙️ ᴍᴏᴅᴇ: ${MODE}
┃ 🏷️ ᴠᴇʀsɪᴏɴ: ${VERSION}
┃ 📅 ᴅᴀᴛᴇ: ${date}
┃ 🕐 ᴛɪᴍᴇ: ${time}
┃
╰━━━━━━━━━━━━━━━━━╯
${menuSections}

╭━━━━━━━━━━━━━━━━━━━╮
┃                               
┃🔥 ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐆ʜᴏsᴛ-𝐌ᴅ  
┃                               
┃  「 ᴛʏᴘᴇ ${PREFIX}ᴍᴇɴᴜ 」 
┃                               
╰━━━━━━━━━━━━━━━━━━━╯
`;

        // Determine image
        let imageToSend;
        const localImagePath = path.join(__dirname, '../lib/ERFAN.jpg');
        const imageValidation = await validateImage(BOT_IMAGE);

        if (imageValidation.valid) {
            imageToSend = imageValidation.buffer;
        } else if (fs.existsSync(localImagePath)) {
            imageToSend = fs.readFileSync(localImagePath);
        } else {
            return await conn.sendMessage(from, { 
                text: dec,
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
        }

        await conn.sendMessage(from, { 
            image: imageToSend,
            caption: dec, 
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
        console.log(e); 
        reply(`❌ Error: ${e.message}`); 
    } 
});
