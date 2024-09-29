const config = require('../config')
const {cmd, commands} = require('../command')

cmd({
  pattern: "kick", 
  alias: ["remove"], 
  react: "🦶", 
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
    await conn.groupParticipantsUpdate(mention, 'remove');
    const mass = await conn.sendMessage(mention, { 
      text: `*${mention.replace(/@/g, '@')} KICKED BY SILENT-SOBX-MD*`
    }, { 
      quoted: mek 
    });
    return await conn.sendMessage(mention, { 
      react: { 
        text: '', 
        key: mass.key 
      } 
    });
  } catch (e) {
    console.log('Error Message:', e.message)
    console.log('Error Stack:', e.stack)
    reply('An error occurred while kicking member. Check console logs.')
  }
})
