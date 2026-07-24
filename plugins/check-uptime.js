import { fileURLToPath } from "url";
import path from "path";
import { cmd } from "../command.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cmd({
    pattern: "uptime",
    alias: ["runtime", "up"],
    desc: "Check bot uptime",
    category: "utility",
    react: "⏱️",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        // ⏳ Processing React
        await conn.sendMessage(from, {
            react: {
                text: "⏳",
                key: mek.key
            }
        });

        await new Promise(resolve => setTimeout(resolve, 1000));

        const formatUptime = (seconds) => {
            const days = Math.floor(seconds / 86400);
            const hours = Math.floor((seconds % 86400) / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = Math.floor(seconds % 60);

            let time = "";

            if (days) time += `${days} day${days > 1 ? "s" : ""} `;
            if (hours) time += `${hours} hour${hours > 1 ? "s" : ""} `;
            if (minutes) time += `${minutes} minute${minutes > 1 ? "s" : ""} `;
            if (secs || !time) time += `${secs} second${secs !== 1 ? "s" : ""}`;

            return time.trim();
        };

        const uptime = formatUptime(process.uptime());

        await conn.sendMessage(from, {
            text: `⏱️ *Uptime:* ${uptime}`,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999,
                mentionedJid: [m.sender]
            }
        }, {
            quoted: mek
        });

        await new Promise(resolve => setTimeout(resolve, 800));

        // ✅ Success React
        await conn.sendMessage(from, {
            react: {
                text: "✅",
                key: mek.key
            }
        });

    } catch (e) {
        console.error("Uptime Error:", e);

        await conn.sendMessage(from, {
            react: {
                text: "❌",
                key: mek.key
            }
        });

        return reply(`❌ Error checking uptime:\n${e.message}`);
    }
});
