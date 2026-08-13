// 𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../config.js';
import { cmd } from '../command.js';
import axios from 'axios';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const botName = "𝐆ʜᴏsᴛ-𝐌ᴅ💀🚩";
const API_BASE_URL = 'https://ghost-mini-bot.vercel.app/api';

function getCountStatus(count) {
    if (count === 50) return '🔴';
    if (count >= 40) return '🟣';
    if (count >= 30) return '🟡';
    if (count >= 20) return '🟠';
    if (count >= 10) return '🔵';
    return '🟢';
}

async function checkServerWithRetry(server, attempts = 2) {
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            const statusResponse = await axios.get(`${API_BASE_URL}/status/${server.id}`, { timeout: 10000 });
            if (statusResponse.data && !statusResponse.data.error) {
                const count = statusResponse.data.count || 0;
                const limit = statusResponse.data.limit || 50;
                return {
                    server: server.id,
                    name: server.name,
                    count,
                    limit,
                    online: true,
                    status: `${getCountStatus(count)} ONLINE`
                };
            } else {
                return {
                    server: server.id,
                    name: server.name,
                    count: 0,
                    limit: 50,
                    online: false,
                    noData: true,
                    status: '🟡 NO DATA'
                };
            }
        } catch (err) {
            if (attempt < attempts) {
                await new Promise((r) => setTimeout(r, 700));
                continue;
            }
            return {
                server: server.id,
                name: server.name,
                count: 0,
                limit: 50,
                online: false,
                status: '🔴 OFFLINE'
            };
        }
    }
}

cmd({
    pattern: 'funxy',
    alias: ['serverstatus', 'stats', 'servers'],
    react: '📊',
    desc: 'Check server status and active users',
    category: 'owner',
    use: '.funxy',
    filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
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

        const serversResponse = await axios.get(`${API_BASE_URL}/servers`, { timeout: 8000 });

        if (!serversResponse.data || !serversResponse.data.servers) {
            return reply('*❌ ғᴀɪʟᴇᴅ ᴛᴏ ғᴇᴛᴄʜ sᴇʀᴠᴇʀ ʟɪsᴛ!*');
        }

        const servers = serversResponse.data.servers;
        const results = await Promise.allSettled(
            servers.map((server) => checkServerWithRetry(server))
        );

        const serverStatus = results.map((r, i) =>
            r.status === 'fulfilled'
                ? r.value
                : {
                      server: servers[i].id,
                      name: servers[i].name,
                      count: 0,
                      limit: 50,
                      online: false,
                      status: '🔴 OFFLINE'
                  }
        );

        let totalActive = 0;
        let totalLimit = 0;
        let onlineServers = 0;
        let offlineServers = 0;

        for (const s of serverStatus) {
            if (s.online) {
                onlineServers++;
                totalActive += s.count;
                totalLimit += s.limit;
            } else {
                offlineServers++;
            }
        }

        let statusMessage = `╭━━━〔 ${botName} 〕━━━⊷\n\n`;
        statusMessage += `╭━━━━〔 📊 sᴇʀᴠᴇʀ sᴛᴀᴛᴜs 〕━━━━╮\n`;
        statusMessage += `┃\n`;
        statusMessage += `┃  📊 *ᴛᴏᴛᴀʟ:* ${servers.length}\n`;
        statusMessage += `┃  🟢 *ᴏɴʟɪɴᴇ:* ${onlineServers}\n`;
        statusMessage += `┃  🔴 *ᴏғғʟɪɴᴇ:* ${offlineServers}\n`;
        statusMessage += `┃  👤 *ᴀᴄᴛɪᴠᴇ:* ${totalActive}/${totalLimit}\n`;
        statusMessage += `┃\n`;
        statusMessage += `┃━━━━━━━━━━━━━━━━━━━━\n`;

        serverStatus.forEach((s) => {
            const statusIcon = s.status.split(' ')[0];
            const statusText = s.status.split(' ')[1];
            statusMessage += `┃  ${s.name.padEnd(8)}: ${String(s.count).padStart(2)}/${s.limit} ${statusIcon} ${statusText}\n`;
        });

        statusMessage += `┃\n`;
        statusMessage += `╰━━━━━━━━━━━━━━━━━━━⬣\n`;
        statusMessage += `\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ*`;

        await conn.sendMessage(from, {
            text: statusMessage,
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

    } catch (error) {
        console.error('Status command error:', error);
        await reply(`*❌ ᴇʀʀᴏʀ:* \`\`\`${error.message}\`\`\``);
    }
});
