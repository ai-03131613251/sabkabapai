//---------------------------------------------------------------------------
//           NAWAZ MD - YOUTUBE VIDEO DOWNLOADER (ESM)
//---------------------------------------------------------------------------

import { fileURLToPath } from "url";
import path from "path";
import axios from "axios";
import yts from "yt-search";
import { cmd } from "../command.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple In-memory Cache
const cache = new Map();

/**
 * Normalize YouTube URL
 */
function normalizeYouTubeUrl(url) {
    const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/.*[?&]v=)([a-zA-Z0-9_-]{11})/
    );

    return match
        ? `https://youtube.com/watch?v=${match[1]}`
        : null;
}

/**
 * Get Download Link
 */
async function fetchDownloadData(url, retries = 2) {
    try {
        if (cache.has(url)) {
            return cache.get(url);
        }

        const apiUrl = `https://jawad-tech.vercel.app/download/ytdl?url=${encodeURIComponent(url)}`;

        const { data } = await axios.get(apiUrl, {
            timeout: 20000
        });

        if (data.status && data.result) {

            const result = {
                video_url: data.result.mp4,
                title: data.result.title || "YouTube Video"
            };

            cache.set(url, result);

            return result;
        }

        throw new Error("API Failed");

    } catch (err) {

        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return fetchDownloadData(url, retries - 1);
        }

        return null;
    }
}

cmd({
    pattern: "drama",
    alias: ["ytmp4", "vdl"],
    react: "🎬",
    desc: "Download YouTube Videos",
    category: "download",
    filename: __filename
}, async (conn, mek, m, {
    from,
    q,
    reply,
    prefix,
    command
}) => {

    try {

        if (!q) {
            return reply(
                `🎥 *Usage:*\n${prefix + command} <video name or youtube link>`
            );
        }

        await conn.sendMessage(from, {
            react: {
                text: "🔍",
                key: mek.key
            }
        });

        let ytdata;
        const url = normalizeYouTubeUrl(q);

        if (url) {

            const search = await yts(url);

            ytdata = search.videos?.[0];

        } else {

            const search = await yts(q);

            if (!search.videos.length) {
                return reply("❌ No video found.");
            }

            ytdata = search.videos[0];
        }

        const info = `
╭───────────────🎥
│ *YOUTUBE DOWNLOADER*
╰───────────────

🎬 *Title:* ${ytdata.title}

📺 *Channel:* ${ytdata.author?.name || "Unknown"}

⏱ *Duration:* ${ytdata.timestamp}

👁 *Views:* ${ytdata.views.toLocaleString()}

━━━━━━━━━━━━━━━━━━

⬇️ *Downloading... Please Wait*

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ
`;

        await conn.sendMessage(from, {
            image: {
                url: ytdata.thumbnail || ytdata.image
            },
            caption: info
        }, {
            quoted: mek
        });

        await conn.sendMessage(from, {
            react: {
                text: "⏳",
                key: mek.key
            }
        });

        const download = await fetchDownloadData(ytdata.url);

        if (!download || !download.video_url) {
            return reply("❌ Unable to fetch download link.");
        }
        try {

            const video = await axios.get(download.video_url, {
                responseType: "arraybuffer",
                timeout: 60000
            });

            await conn.sendMessage(from, {
                video: Buffer.from(video.data),
                mimetype: "video/mp4",
                caption: `🎬 *${download.title}*

✅ Download Completed Successfully.

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ`
            }, {
                quoted: mek
            });

        } catch (err) {

            console.log("VIDEO SEND ERROR:", err);

            return reply(
                "❌ Video send failed.\n\nThe download link may have expired or the file is too large."
            );
        }

        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: mek.key
            }
        });

    } catch (err) {

        console.error("YT VIDEO ERROR:", err);

        await conn.sendMessage(from, {
            react: {
                text: "❌",
                key: mek.key
            }
        });

        return reply(
            "⚠️ Something went wrong while processing your request."
        );
    }

});
