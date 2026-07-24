// mode.js - ESM Version
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { cmd } from '../command.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 🔒 ڈیفالٹ موڈ PRIVATE ہے
let botMode = 'private';

// ===== MODE SET COMMAND (with on/off support) =====
cmd({
    pattern: "mode",
    alias: ["setmode"],
    desc: "Set bot mode (public or private) with on/off support",
    category: "owner",
    react: "⚙️",
    filename: __filename
}, async (conn, mek, m, { args, isCreator, reply, q }) => {
    if (!isCreator) return reply("❌ Only the owner can change bot mode.");

    // پورا کمانڈ ٹیکسٹ (کیونکہ args صرف پہلا لفظ لیتا ہے)
    const fullQuery = q || args.join(' ');
    const lowerQuery = fullQuery.toLowerCase();

    let newMode = null;

    // 📌 چیک کریں کہ کونسا موڈ سیٹ کرنا ہے
    if (lowerQuery.includes('private')) {
        // .mode private, .mode private on, .mode private off
        if (lowerQuery.includes('off')) {
            newMode = 'public';  // private off means public
        } else {
            newMode = 'private'; // private or private on
        }
    } else if (lowerQuery.includes('public')) {
        // .mode public, .mode public on, .mode public off
        if (lowerQuery.includes('off')) {
            newMode = 'private'; // public off means private
        } else {
            newMode = 'public';  // public or public on
        }
    }

    // اگر کوئی موڈ نہ ملا تو غلطی دیں
    if (!newMode) {
        return reply(
            "❌ Invalid mode!\n" +
            "Usage:\n" +
            "• `.mode private` or `.mode private on`\n" +
            "• `.mode private off` (to make public)\n" +
            "• `.mode public` or `.mode public on`\n" +
            "• `.mode public off` (to make private)"
        );
    }

    // موڈ اپ ڈیٹ کریں
    botMode = newMode;
    reply(`✅ Bot mode set to: *${newMode.toUpperCase()}*`);
});

// ===== PRIVATE COMMAND =====
cmd({
    pattern: "private",
    desc: "Switch bot to private mode",
    category: "owner",
    react: "🔒",
    filename: __filename
}, async (conn, mek, m, { isCreator, reply }) => {
    if (!isCreator) return reply("❌ Only the owner can use this.");
    botMode = 'private';
    reply("🔒 Bot is now in *PRIVATE* mode. Only owner can use commands.");
});

// ===== PUBLIC COMMAND =====
cmd({
    pattern: "public",
    desc: "Switch bot to public mode",
    category: "owner",
    react: "🌍",
    filename: __filename
}, async (conn, mek, m, { isCreator, reply }) => {
    if (!isCreator) return reply("❌ Only the owner can use this.");
    botMode = 'public';
    reply("🌍 Bot is now in *PUBLIC* mode. Everyone can use commands.");
});

// 📤 موڈ کو دوسری فائلوں کے لیے ایکسپورٹ کریں
export { botMode };
