// unmute.js - ESM Version
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from '../config.js';
import { cmd, commands } from '../command.js';
import { getBuffer, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } from '../lib/functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cmd({
  pattern: "unmute",
  alias: ["unlock", "open"],
  desc: "Unmute the group (admins only)",
  category: "group",
  react: "🔊",
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
    if (!isBotAdmins) return await reply("❌ I must be admin to unmute the group.");
    if (!isAdmins && !isCreator) return await reply("🔐 Only group admins or owner can use this command.");

    await conn.groupSettingUpdate(from, 'not_announcement');
    await reply("*🔊 Group has been unmuted!* \nEveryone can send messages now.");

  } catch (err) {
    console.error(err);
    await reply("❌ Failed to unmute group. Something went wrong.");
  }
});
