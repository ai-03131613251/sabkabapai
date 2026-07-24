import { fileURLToPath } from "url";
import path from "path";
import config from "../config.js";
import { cmd } from "../command.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let antiBotGroups = {};

cmd({
    pattern: "antibot",
    alias: ["abot"],
    desc: "Enable or disable AntiBot",
    category: "group",
    react: "🤖",
    filename: __filename
}, async (conn, mek, m, {
    from,
    args,
    isGroup,
    isAdmins,
    isCreator,
    reply
}) => {
    try {
        if (!isGroup) return reply("❌ This command only works in groups.");
        if (!isAdmins && !isCreator) {
            return reply("❌ Only admins can use this command.");
        }

        const option = (args[0] || "").toLowerCase();

        if (option === "on") {
            antiBotGroups[from] = true;
            return reply("✅ AntiBot has been enabled.");
        }

        if (option === "off") {
            antiBotGroups[from] = false;
            return reply("✅ AntiBot has been disabled.");
        }

        const status = antiBotGroups[from] ? "ON 🟢" : "OFF 🔴";

        return reply(`🤖 *AntiBot Status:* ${status}

Usage:
.antibot on
.antibot off`);
    } catch (e) {
        console.error("AntiBot Error:", e);
        return reply("❌ Error while changing AntiBot setting.");
    }
});
