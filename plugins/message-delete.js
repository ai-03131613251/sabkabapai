// antidelete.js - ESM Version
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { cmd } from '../command.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cmd({
    on: "messages.update",
    filename: __filename
},
async (conn, updates) => {

    try {

        for (const msg of updates) {

            // check delete status
            if (!msg || !msg.update || !msg.update.message) continue;

            const message = msg.update.message;

            const ownerJid = conn.user?.id;
            if (!ownerJid) return;

            let text = `🚨 DELETED MESSAGE DETECTED 🚨\n\n`;
            text += `📍 Chat: ${msg.key.remoteJid}\n`;
            text += `👤 User: ${msg.key.participant || msg.key.remoteJid}\n\n`;

            if (message.conversation) {
                text += `💬 Text:\n${message.conversation}`;
            }

            await conn.sendMessage(ownerJid, { text });

        }

    } catch (e) {
        console.log("AntiDelete Error:", e);
    }

});
