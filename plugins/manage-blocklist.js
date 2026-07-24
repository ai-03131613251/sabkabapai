// block.js - ESM Version
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { cmd } from '../command.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── BLOCK COMMAND ───
cmd({
    pattern: "block",
    desc: "Block replied/mentioned user",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, m) => {

    const owner = conn.user.id.split(":")[0] + "@s.whatsapp.net";

    if (m.sender !== owner) {
        return m.reply("❌ Only owner can use this command.");
    }

    let jid;

    if (m.quoted) {
        jid = m.quoted.sender;
    } else if (m.mentionedJid && m.mentionedJid.length > 0) {
        jid = m.mentionedJid[0];
    } else {
        return m.reply("❌ Reply or mention a user.");
    }

    try {
        await conn.updateBlockStatus(jid, "block");

        await conn.sendMessage(
            m.chat,
            {
                text: `🚫 Successfully Blocked @${jid.split("@")[0]}`,
                mentions: [jid]
            },
            { quoted: m }
        );

    } catch (e) {
        console.log(e);
        m.reply("❌ Failed to block user.");
    }
});

// ─── UNBLOCK COMMAND ───
cmd({
    pattern: "unblock",
    desc: "Unblock replied/mentioned user",
    category: "owner",
    react: "🔓",
    filename: __filename
},
async (conn, m) => {

    const owner = conn.user.id.split(":")[0] + "@s.whatsapp.net";

    if (m.sender !== owner) {
        return m.reply("❌ Only owner can use this command.");
    }

    let jid;

    if (m.quoted) {
        jid = m.quoted.sender;
    } else if (m.mentionedJid && m.mentionedJid.length > 0) {
        jid = m.mentionedJid[0];
    } else {
        return m.reply("❌ Reply or mention a user.");
    }

    try {
        await conn.updateBlockStatus(jid, "unblock");

        await conn.sendMessage(
            m.chat,
            {
                text: `🔓 Successfully Unblocked @${jid.split("@")[0]}`,
                mentions: [jid]
            },
            { quoted: m }
        );

    } catch (e) {
        console.log(e);
        m.reply("❌ Failed to unblock user.");
    }
});
