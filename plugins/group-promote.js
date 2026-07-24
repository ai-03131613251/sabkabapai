// promote.js - ESM Version
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { cmd } from '../command.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cmd({
  pattern: "promote",
  desc: "Temporary admin for 2 seconds",
  category: "group",
  react: "⬆️",
  filename: __filename
}, async (sock, m, msg, { from, quoted, isGroup }) => {

  try {
    if (!isGroup) return m.reply("❌ This command is only for groups");

    let user = quoted ? quoted.sender : m.mentionedJid?.[0];
    if (!user) return m.reply("❌ Reply or mention a user");

    // Promote user
    await sock.groupParticipantsUpdate(from, [user], "promote");

    m.reply("⬆️ User promoted for 2 seconds");

    // After 2 seconds demote
    setTimeout(async () => {
      try {
        await sock.groupParticipantsUpdate(from, [user], "demote");
      } catch (e) {
        console.log("Auto demote error:", e);
      }
    }, 2000);

  } catch (e) {
    console.log(e);
    m.reply("❌ Error occurred");
  }
});
