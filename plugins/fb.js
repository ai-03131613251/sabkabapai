import { fileURLToPath } from "url";
import path from "path";
import axios from "axios";
import { cmd } from "../command.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cmd({
    pattern: "fb",
    alias: ["facebook", "fbdl"],
    react: "📥",
    desc: "Download videos from Facebook (API v4)",
    category: "download",
    use: ".fb <Facebook Video URL>",
    filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
    try {
        const fbUrl = args[0];

        if (!fbUrl || !fbUrl.includes("facebook.com")) {
            return reply(
                "❌ Please provide a valid Facebook video URL.\n\nExample:\n.fb https://facebook.com/..."
            );
        }

        await conn.sendMessage(from, {
            react: {
                text: "⏳",
                key: mek.key
            }
        });

        const apiUrl = `https://jawad-tech.vercel.app/downloader?url=${encodeURIComponent(fbUrl)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !Array.isArray(data.result)) {
            return reply("❌ Unable to fetch the video. Please check the URL and try again.");
        }

        // Prefer HD, otherwise use SD
        const video =
            data.result.find(v => v.quality === "HD") ||
            data.result.find(v => v.quality === "SD");

        if (!video) {
            return reply("❌ Video not found in the API response.");
        }

        await reply("📥 Downloading video, please wait...");

        await conn.sendMessage(
            from,
            {
                video: { url: video.url },
                caption: `🎥 *Facebook Video Downloader*\n\n📺 Quality: ${video.quality}\n\n> Powered By 𝐌ᴀғɪᴀ 𝐀ᴅᴇᴇʟ`
            },
            { quoted: mek }
        );

        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: mek.key
            }
        });

    } catch (error) {
        console.error("Facebook Downloader Error:", error);

        await conn.sendMessage(from, {
            react: {
                text: "❌",
                key: mek.key
            }
        });

        return reply("❌ Failed to download the video. Please try again later.");
    }
});
