const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "kick1",
    desc: "Kick a member from the group.",
    category: "group",
    react: "🥾",
    filename: __filename
}, async (sock, chat, args) => {
    // Check if the command has sufficient arguments
    if (args.length < 1) {
        return sock.sendMessage(chat.id, { text: "Please provide the user ID to kick." });
    }

    const userIdToKick = args[0];

    try {
        await sock.groupParticipantsUpdate(
            chat.id, 
            [userIdToKick], 
            "remove"
        );
        sock.sendMessage(chat.id, { text: `User ${userIdToKick} has been kicked from the group.` });
    } catch (error) {
        console.error(error);
        sock.sendMessage(chat.id, { text: "Failed to kick the user. Please check if the user is in the group." });
    }
});
