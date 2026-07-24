// readmore.js - ESM Version
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { cmd } from '../command.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cmd({
  pattern: "readmore",
  alias: ["rm", "rmore", "readm"],
  desc: "Generate a Read More message with hidden text",
  category: "utility",
  use: ".readmore <your text>",
  react: "📝",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    if (!args[0]) return reply("❌ Please provide text!\nExample: .readmore Hello world");

    const inputText = args.join(" ");
    const readMoreGap = String.fromCharCode(8206).repeat(4001); // Creates hidden gap
    const message = `${inputText}${readMoreGap}`; // No "Continue Reading" text needed

    await conn.sendMessage(from, { text: message }, { quoted: mek });
    
  } catch (error) {
    console.error("Readmore Error:", error);
    reply("❌ Failed to create readmore message. Please try again.");
  }
});
