const config = require('../config')
const { cmd, commands } = require('../command')

cmd({
    pattern: "kick",
    desc: "Remove a member from the group.",
    category: "group",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
    if (!message.isGroup) return await message.send("_This command is for groups_");   
    match = message.mention?.jid?.[0] || message.reply_message?.sender || match;
    if (!match) return await message.reply("_Reply to someone/mention_\n*Example:* .kick @user");    
    if (!await isAdmin(message, message.user.jid)) return await message.send("_I'm not an admin_");
    if (match === "all") {
        let { participants } = await message.client.groupMetadata(message.jid);
        participants = participants.filter(p => p.id !== message.user.jid);       
        await message.reply("_To stop this process, use the restart command_");
        for (let key of participants) {
            const jid = parsedJid(key.id);
            await message.client.groupParticipantsUpdate(message.jid, jid, "remove");
            await message.send(`_@${jid[0].split("@")[0]} kicked successfully_`, { mentions: jid });
        }
       }
   } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
