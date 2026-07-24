// report.js - ESM Version (User Report)
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { cmd } from '../command.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cmd({
    pattern: "report",
    react: "🚨",
    category: "misc",
    filename: __filename
}, async (conn, mek, m, { from, sender, text }) => {

    const owner = "923131613251@s.whatsapp.net"; // درست JID format

    if (!text) {
        return conn.sendMessage(from, {
            text: "❌ Please write something to report\nExample: .report bot is not working"
        }, { quoted: mek });
    }

    // user response
    await conn.sendMessage(from, {
        text: "✅ Report sent successfully"
    }, { quoted: mek });

    // owner ko report
    await conn.sendMessage(owner, {
        text:
`🚨 NEW REPORT RECEIVED

👤 From: ${sender}
📍 Chat: ${from}
📝 Report: ${text}`
    }, { quoted: mek });

});
