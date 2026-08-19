import { fileURLToPath } from 'url';
import { cmd } from '../command.js';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const API_BASE = "https://xjawadtech.vercel.app";

// ==================== CONFIG ====================
const CONFIG = {
    cooldown: 10000,           // 10 seconds cooldown per user
    timeout: 20000,            // API timeout
    maxFileSize: 100,          // Max file size in MB
    brandName: "SAHIL-MD",
    footer: "> Powered by SAHIL-MD",
    defaultQuality: "720p"     // Default video quality
};

// ==================== STATE ====================
const cooldowns = new Map();
const activeListeners = new Map();

// ==================== HELPERS ====================

// Small caps font
const toSmallCaps = (text) => {
    const map = {
        'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ',
        'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ',
        'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x',
        'y': 'ʏ', 'z': 'ᴢ', ' ': ' '
    };
    return text.split('').map(c => map[c.toLowerCase()] || c).join('');
};

// Extract YouTube ID
const getVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
};

// Cooldown check
const isOnCooldown = (userId) => {
    const last = cooldowns.get(userId);
    if (!last) return false;
    return Date.now() - last < CONFIG.cooldown;
};

// Set cooldown
const setCooldown = (userId) => cooldowns.set(userId, Date.now());

// Format numbers
const formatNumber = (num) => num?.toLocaleString() || 'N/A';

// Format bytes to MB/GB
const formatSize = (bytes) => {
    if (!bytes) return 'Unknown';
    const mb = bytes / (1024 * 1024);
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    return `${(mb / 1024).toFixed(2)} GB`;
};

// Clean old listeners (Memory Management)
const cleanupListener = (userId) => {
    if (activeListeners.has(userId)) {
        const { conn, listener } = activeListeners.get(userId);
        conn.ev.off("messages.upsert", listener);
        activeListeners.delete(userId);
    }
};

// Safe API call with retry logic
const fetchWithFallback = async (endpoints, timeout = CONFIG.timeout) => {
    for (const url of endpoints) {
        try {
            const res = await axios.get(url, { timeout, headers: { 'User-Agent': 'Mozilla/5.0' } });
            if (res.data?.status && res.data?.download?.url) {
                return {
                    url: res.data.download.url,
                    size: res.data.download.size,
                    quality: res.data.download.quality
                };
            }
        } catch (e) {
            continue;
        }
    }
    return null;
};

// Unified search handler
const searchYouTube = async (text) => {
    const { default: yts } = await import('yt-search');
    
    if (text.startsWith('http://') || text.startsWith('https://')) {
        if (!text.includes("youtube.com") && !text.includes("youtu.be")) {
            return { error: "❌ Please provide a valid YouTube URL!" };
        }
        const videoId = getVideoId(text);
        if (!videoId) return { error: "❌ Invalid YouTube URL!" };
        const result = await yts({ videoId });
        return { video: result, url: result.url };
    } else {
        const search = await yts(text);
        if (!search.videos?.length) return { error: "❌ No results found!" };
        return { video: search.videos[0], url: search.videos[0].url };
    }
};

// ==================== UI BUILDERS ====================

const buildInfoCard = (vid, type = 'audio') => {
    const icon = type === 'audio' ? '🎧' : '🎬';
    const title = type === 'audio' ? 'AUDIO DOWNLOADER' : 'VIDEO DOWNLOADER';
    
    return `*╭┈───〔 ${toSmallCaps(title)} 〕┈───⊷*
*├▢ 🎬 Title:* ${vid.title}
*├▢ 📺 Channel:* ${vid.author?.name || 'Unknown'}
*├▢ ⏰ Duration:* ${vid.timestamp}
*├▢ 👀 Views:* ${formatNumber(vid.views)}
*├▢ 📅 Uploaded:* ${vid.ago || 'N/A'}
*╰───────────────────⊷*

*⏳ Status:* Downloading ${type === 'audio' ? 'Audio' : 'Video'}...

${CONFIG.footer}`;
};

const buildMenuCard = (vid) => {
    return `*╭┈───〔 ${toSmallCaps('YT Downloader')} 〕┈───⊷*
*├▢ 🎬 Title:* ${vid.title}
*├▢ 📺 Channel:* ${vid.author?.name || 'Unknown'}
*├▢ ⏰ Duration:* ${vid.timestamp}
*├▢ 👀 Views:* ${formatNumber(vid.views)}
*╰───────────────────⊷*

*╭───⬡ ${toSmallCaps('Select Format')} ⬡───*
*┋ ⬡ 1* 🎧 ${toSmallCaps('Audio (MP3)')}
*┋ ⬡ 2* 📹 ${toSmallCaps('Video (MP4)')}
*┋ ⬡ 3* 📁 ${toSmallCaps('Audio as Document')}
*┋ ⬡ 4* 📁 ${toSmallCaps('Video as Document')}
*╰───────────────────⊷*

_Reply with number (1-4) within 30 seconds_

${CONFIG.footer}`;
};

// ==================== DOWNLOAD HANDLERS ====================

const downloadAudio = async (conn, from, vid, quoted, asDocument = false) => {
    const endpoints = Array.from({ length: 7 }, (_, i) => 
        `${API_BASE}/yta${i + 1}?url=${encodeURIComponent(vid.url)}`
    );

    const result = await fetchWithFallback(endpoints);
    if (!result) return false;

    const msg = {
        [asDocument ? 'document' : 'audio']: { url: result.url },
        mimetype: "audio/mpeg",
        fileName: `${vid.title}.mp3`,
        ...(asDocument ? {} : { ptt: false })
    };

    await conn.sendMessage(from, msg, { quoted });
    return true;
};

const downloadVideo = async (conn, from, vid, quoted, quality = CONFIG.defaultQuality, asDocument = false) => {
    const endpoints = Array.from({ length: 4 }, (_, i) => 
        `${API_BASE}/ytv${i + 1}?url=${encodeURIComponent(vid.url)}&quality=${quality}`
    );

    const result = await fetchWithFallback(endpoints);
    if (!result) return false;

    const msg = {
        [asDocument ? 'document' : 'video']: { url: result.url },
        mimetype: "video/mp4",
        fileName: `${vid.title} [${quality}].mp4`,
        ...(asDocument ? {} : { caption: `🎬 *${vid.title}*\n\n${CONFIG.footer}` })
    };

    await conn.sendMessage(from, msg, { quoted });
    return true;
};

// ==================== COMMANDS ====================

// ---------- PLAY (Audio) ----------
cmd({
    pattern: "play",
    alias: ["song", "music", "audio", "yta"],
    desc: "Download YouTube audio with best quality",
    category: "download",
    react: "🎧",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, sender }) => {
    try {
        if (!text) return reply("❌ *Usage:* `.play <song name or URL>`\n\n*Example:*\n`.play Shape of You`\n`.play https://youtube.com/...`");

        if (isOnCooldown(sender)) {
            return reply("⏳ *Please wait!* You are on cooldown. Try again in a few seconds.");
        }
        setCooldown(sender);

        const search = await searchYouTube(text);
        if (search.error) return reply(search.error);

        const { video: vid, url } = search;

        await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption: buildInfoCard(vid, 'audio')
        }, { quoted: mek });

        const success = await downloadAudio(conn, from, vid, mek);
        
        if (!success) {
            return reply("❌ *Download Failed!*\nAll audio sources are currently down. Please try again later.");
        }

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error("PLAY ERROR:", err);
        reply("❌ *Error occurred!* Please try again later.");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

// ---------- VIDEO (Video) ----------
cmd({
    pattern: "video",
    alias: ["ytv", "ytmp4", "vd", "mp4"],
    desc: "Download YouTube video with quality selection",
    category: "download",
    react: "📹",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, sender }) => {
    try {
        if (!text) return reply("❌ *Usage:* `.video <video name or URL>`\n\n*Example:*\n`.video Alone Marshmello`\n`.video https://youtube.com/...`");

        if (isOnCooldown(sender)) {
            return reply("⏳ *Please wait!* You are on cooldown.");
        }
        setCooldown(sender);

        const search = await searchYouTube(text);
        if (search.error) return reply(search.error);

        const { video: vid } = search;

        await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption: buildInfoCard(vid, 'video')
        }, { quoted: mek });

        const success = await downloadVideo(conn, from, vid, mek);
        
        if (!success) {
            return reply("❌ *Download Failed!*\nAll video sources are currently down. Please try again later.");
        }

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error("VIDEO ERROR:", err);
        reply("❌ *Error occurred!* Please try again later.");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

// ---------- YT (Interactive Menu) ----------
cmd({
    pattern: "yt",
    alias: ["ytdl", "youtube", "downloader"],
    desc: "Interactive YouTube downloader menu",
    category: "download",
    react: "🎬",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, sender }) => {
    try {
        if (!text) return reply("❌ *Usage:* `.yt <video name or URL>`\n\n*Example:*\n`.yt Alan Walker - Faded`");

        if (isOnCooldown(sender)) {
            return reply("⏳ *Please wait!* You are on cooldown.");
        }
        setCooldown(sender);

        const search = await searchYouTube(text);
        if (search.error) return reply(search.error);

        const { video: vid } = search;

        // Cleanup any existing listener for this user
        cleanupListener(sender);

        const sent = await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption: buildMenuCard(vid)
        }, { quoted: mek });

        const msgId = sent.key.id;

        // Create listener
        const songListener = async (msgData) => {
            try {
                const received = msgData.messages[0];
                if (!received?.message) return;

                const selected = received.message.conversation || received.message.extendedTextMessage?.text;
                const isReplyToBot = received.message.extendedTextMessage?.contextInfo?.stanzaId === msgId;

                if (!isReplyToBot) return;

                // Valid options check
                if (!['1', '2', '3', '4'].includes(selected)) {
                    await conn.sendMessage(from, {
                        text: `❌ *Invalid selection!*\nPlease reply with:\n*1* 🎧 Audio\n*2* 📹 Video\n*3* 📁 Audio as File\n*4* 📁 Video as File`
                    }, { quoted: received });
                    return;
                }

                // Remove listener immediately to prevent double processing
                cleanupListener(sender);
                await conn.sendMessage(from, { react: { text: '⬇️', key: received.key } });

                let success = false;

                switch (selected) {
                    case '1': // Audio
                        success = await downloadAudio(conn, from, vid, received);
                        break;
                    case '2': // Video
                        success = await downloadVideo(conn, from, vid, received);
                        break;
                    case '3': // Audio as Document
                        success = await downloadAudio(conn, from, vid, received, true);
                        break;
                    case '4': // Video as Document
                        success = await downloadVideo(conn, from, vid, received, CONFIG.defaultQuality, true);
                        break;
                }

                if (!success) {
                    await conn.sendMessage(from, {
                        text: "❌ *All download sources failed!*\nPlease try again later."
                    }, { quoted: received });
                    await conn.sendMessage(from, { react: { text: '❌', key: received.key } });
                } else {
                    await conn.sendMessage(from, { react: { text: '✅', key: received.key } });
                }

            } catch (e) {
                console.error("Listener Error:", e);
            }
        };

        // Store listener reference
        activeListeners.set(sender, { conn, listener: songListener });
        conn.ev.on("messages.upsert", songListener);

        // Auto cleanup after 30 seconds
        setTimeout(() => {
            cleanupListener(sender);
        }, 30000);

    } catch (err) {
        console.error("YT ERROR:", err);
        reply(`❌ *Error:* ${err.message}`);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});

// ---------- QUALITY (Video with specific quality) ----------
cmd({
    pattern: "ytquality",
    alias: ["quality", "vq", "vquality"],
    desc: "Download video with specific quality",
    category: "download",
    react: "🎥",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, sender }) => {
    try {
        if (!text) return reply(`❌ *Usage:* \`.ytquality <URL> <quality>\`\n\n*Available Qualities:*\n• 360p\n• 480p\n• 720p (Default)\n• 1080p\n\n*Example:*\n\`.ytquality https://youtube.com/... 720p\``);

        if (isOnCooldown(sender)) {
            return reply("⏳ *Please wait!* You are on cooldown.");
        }
        setCooldown(sender);

        const args = text.trim().split(' ');
        const quality = args[args.length - 1].match(/^\d+p$/) ? args.pop() : CONFIG.defaultQuality;
        const query = args.join(' ');

        if (!query) return reply("❌ Please provide a video URL or name!");

        const search = await searchYouTube(query);
        if (search.error) return reply(search.error);

        const { video: vid } = search;

        await conn.sendMessage(from, {
            image: { url: vid.thumbnail },
            caption: `*╭┈───〔 ${toSmallCaps('Quality Download')} 〕┈───⊷*
*├▢ 🎬 Title:* ${vid.title}
*├▢ 📺 Channel:* ${vid.author?.name || 'Unknown'}
*├▢ 🎯 Quality:* ${quality}
*╰───────────────────⊷*

*⏳ Status:* Downloading ${quality} Video...

${CONFIG.footer}`
        }, { quoted: mek });

        const success = await downloadVideo(conn, from, vid, mek, quality);
        
        if (!success) {
            return reply(`❌ *Failed to download ${quality} quality!*\nTry a lower quality or try again later.`);
        }

        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });

    } catch (err) {
        console.error("QUALITY ERROR:", err);
        reply("❌ *Error occurred!* Please try again later.");
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
    }
});
