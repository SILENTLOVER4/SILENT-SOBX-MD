const config = require('../config');
let fs = require('fs');

const { cmd, commands } = require('../command');
const { 
  getBuffer, 
  getGroupAdmins, 
  getRandom, 
  h2k, 
  isUrl, 
  Json, 
  runtime, 
  sleep, 
  fetchJson
} = require('../lib/functions');

cmd({
cmd({
    pattern: "owner",
    react: "☺️",
    desc: "get owner info.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const [_, cmdName] = body.split(' ');
    switch (cmdName?.toLowerCase()) {
      case "broadcast":
        // Broadcast message to all chats
        if (!args.length) return reply("Provide message");
        const broadcastMsg = args.join(" ");
        conn.broadcast(broadcastMsg);
        reply("Broadcasted successfully");
        break;

      case "ban":
        // Ban user
        if (!args.length) return reply("Provide user ID");
        const userId = args[0];
        conn.banUser(userId);
        reply(`Banned user ${userId}`);
        break;

      case "unban":
        // Unban user
        if (!args.length) return reply("Provide user ID");
        const unbanId = args[0];
        conn.unbanUser(unbanId);
        reply(`Unbanned user ${unbanId}`);
        break;

      case "getnumber":
        // Get bot's phone number
        reply(`Bot's phone number: ${conn.user.phone}`);
        break;

      default:
        reply("Invalid command");
    }
  } catch (e) {
    reply('*Error !!*');
    l(e);
  }
});
