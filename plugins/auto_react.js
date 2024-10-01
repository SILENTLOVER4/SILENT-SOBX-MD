const config = require('../config')
const {cmd, commands} = require('../command')

let autoReactStatus = true;

cmd({
  pattern: "autoreact", 
  alias: [areact], 
  react: "🫂", 
  desc: "toggle auto react.", 
  category: "tools", 
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
    if (args[0] === 'on') {
      autoReactStatus = true;
      reply('Auto react enabled.');
    } else if (args[0] === 'off') {
      autoReactStatus = false;
      reply('Auto react disabled.');
    } else {
      reply(`Auto react is currently ${autoReactStatus ? 'enabled' : 'disabled'}.`);
    }
  } catch (e) {
    console.log('Error Message:', e.message)
    console.log('Error Stack:', e.stack)
    reply('An error occurred. Check console logs.')
  }
})

// Auto react logic
conn.on('message', async (mek) => {
  try {
    if (autoReactStatus && mek.message && mek.message.extendedTextMessage) {
      const msg = mek.message.extendedTextMessage;
      await conn.sendMessage(mek.from, { react: { text: '❤️', key: msg.messageId } });
    }
  } catch (e) {
    console.log('Error Message:', e.message)
    console.log('Error Stack:', e.stack)
  }
})
