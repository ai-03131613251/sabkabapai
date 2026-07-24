// yts.js - ESM Version
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from '../config.js';
import { cmd } from '../command.js';
import yts from 'yt-search';
import fs from 'fs-extra';
import { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } from '../lib/functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const l = console.log;
var videotime = 60000; // 1000 min

cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    use: '.yts nawaz',
    react: "🔎",
    desc: "Search and get details from YouTube.",
    category: "search",
    filename: __filename
},
async (conn, mek, m, {
    from, l, quoted, body, isCmd, umarmd, args, q,
    isGroup, sender, senderNumber, botNumber2, botNumber,
    pushname, isMe, isOwner, groupMetadata, groupName,
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply('*Please give me words to search*');

        let arama = await yts(q);
        let results = arama.all.slice(0, 10); // 🔟 Only the first 10 results
        let mesaj = '';

        results.forEach((video, i) => {
            mesaj += `*${i + 1}. ${video.title}*\n🔗 ${video.url}\n📺 ${video.timestamp} | 👀 ${video.views} views\n\n`;
        });

        await conn.sendMessage(from, { text: mesaj.trim() }, { quoted: mek });

    } catch (e) {
        l(e);
        reply('*Error !!*');
    }
});
