// revoke.js - ESM Version
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from '../config.js';
import { cmd } from '../command.js';
import { getBuffer, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } from '../lib/functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cmd({
  pattern: "revoke",
  alias: ["resetlink", "newlink"],
  desc: "Reset group invite link",
  category: "group",
  react: "🔄",
  filename: __filename
}, async (conn, mek, m, {
  from,
  isCreator,
  isBotAdmins,
  isAdmins,
  isGroup,
  reply
}) => {
  try {
    if (!isGroup) return await reply("⚠️ This command only works in groups.");
    if (!isBotAdmins) return await reply("❌ I must be admin to reset link.");
    if (!isAdmins && !isCreator) return await reply("🔐 Only admins can use this command.");

    const newCode = await conn.groupRevokeInvite(from);
    await reply(`*✅ Link Reset Successful!*\n\n🔗 https://chat.whatsapp.com/${newCode}`);

  } catch (err) {
    console.error(err);
    await reply("❌ Failed to reset link.");
  }
});
