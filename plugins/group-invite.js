// invite.js - ESM Version
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { cmd } from '../command.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cmd({
  pattern: "invite",
  alias: ["aja"],
  desc: "Send group invite link to someone",
  category: "group",
  filename: __filename,
  react: "📨"
}, async (conn, mek, m, { 
  from, args, isGroup, isBotAdmins, isCreator, isAdmins, reply 
}) => {
  try {
    if (!isGroup) return await reply("⚠️ Group only.");
    if (!isBotAdmins) return await reply("❌ I need admin.");
    if (!isCreator && !isAdmins) return await reply("🔐 Admins only.");
    
    if (!args[0]) {
      // If no number provided, just show the link
      const code = await conn.groupInviteCode(from);
      return await reply(`🔗 Group Link:\nhttps://chat.whatsapp.com/${code}`);
    }

    let number = args[0].replace(/[^0-9]/g, '');
    if (number.length < 10) return await reply("⚠️ Invalid number.");
    
    let jid = number + "@s.whatsapp.net";
    
    const metadata = await conn.groupMetadata(from);
    const code = await conn.groupInviteCode(from);
    const link = `https://chat.whatsapp.com/${code}`;
    
    await conn.sendMessage(jid, {
      text: `📨 *You're invited to join ${metadata.subject}*\n\n🔗 ${link}\n\n👤 Invited by: @${m.sender.split('@')[0]}`
    });
    
    await reply(`📨 Invite sent to @${number}`, { mentions: [jid] });

  } catch (err) {
    console.error(err);
    await reply("❌ Failed to send invite.");
  }
});
