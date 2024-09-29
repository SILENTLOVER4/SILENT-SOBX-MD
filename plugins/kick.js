const config = require('../config')
const {cmd, commands} = require('../command')

cmd({
  pattern: "kick", 
  alias: ["remove"], 
  react: "", 
  desc: "kick member from group.", 
  category: "group", 
  filename: __filename,
}, 
async (conn, mek, m, { 
  from, 
  l, 
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
  isItzcp, 
  groupAdmins, 
  isBotAdmins, 
  isAdmins, 
  reply
}) => {
  try {
    if (!isOwner || !isAdmins) return;
    if (!m.isGroup) return reply(mg.onlygroup);
    if (!isBotAdmins) return reply(mg.needbotadmins);
    if (args.length === 0) return reply('Tag or mention member to kick.');
    const mention = mentionedJid(args[0]);
    await conn.groupParticipantsUpdate(m.chat, [mention], 'remove');
    const mass = await conn.sendMessage(m.chat, { 
      text: `*${mention.replace(/@/g, '@')} KICKED BY SILENT-SOBX-MD*`
    }, { 
      quoted: mek 
    });
    return await conn.sendMessage(m.chat, { 
      react: { 
        text: '', 
        key: mass.key 
      } 
    });
  } catch (e) {
    console.log(e);
    reply('*PLEASE GIVE ME A ADMIN ROLE')
  }
})
