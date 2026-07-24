// wallpaper.js - ESM Version
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { cmd } from '../command.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cmd({
    pattern: "wallpaper",
    desc: "Send random wallpaper (stable)",
    category: "media",
    react: "🔞",
    filename: __filename
},
async (conn, mek, m, { reply }) => {

    try {

        // Fully stable random image (no API, no redirect issue)
        let url = `https://picsum.photos/1080/1920?random=${Date.now()}`;

        await conn.sendMessage(m.chat, {
            image: { url },
            caption: "🖼️  Wallpaper\n⚡ Powered by GHOST-MD"
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("❌ Wallpaper load failed, try again");
    }

});
