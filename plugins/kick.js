const config = require('../config')
const { cmd, commands } = require('../command')

cmd({
  pattern: "kick",
  desc: "Remove a member from the group.",
  category: "group",
  react: "🚫",
  filename: __filename
},
async (conn, mek, m, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!isGroup) return await reply("_This command is for groups_");
    let match = m.mention?.jid?.[0] || m.reply_message?.sender || args[0];
    if (!match) return await reply("_Reply to someone/mention_\n*Example:* .kick @user");
    if (!isAdmins && !isOwner) return await reply("_You're not an admin or owner_");
    if (match === "all") {
      let { participants } = await conn.groupMetadata(m.chat);
      participants = participants.filter(p => (link unavailable) !== sender);
      await reply("_To stop this process, use the restart command_");
      for (let key of participants) {
        const jid = (link unavailable);
        await conn.groupParticipantsUpdate(m.chat, jid, 'remove');
        await reply(`_@${jid.split("@")[0]} kicked successfully_`, { mentions: [jid] });
      }
    } else {
      await conn.groupParticipantsUpdate(m.chat, match, 'remove');
      await reply(`_@${match.split("@")[0]} kicked successfully_`, { mentions: [match] });
    }
  } catch (e) {
    console.log(e)
    reply(`${e}`)
  }
})
