const { 
  conn, 
  cmd, 
  commands, 
  messageDelete 
} = require('../index')

global.antidelete = true

cmd({
  pattern: "antidelete",
  desc: "Toggle antidelete feature",
  category: "general",
  react: "",
  filename: __filename
}, async (conn, mek, m, {
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
    const arg = args.join(' ')
    if (arg === 'on') {
      global.antidelete = true
      reply('Antidelete feature enabled.')
    } else if (arg === 'off') {
      global.antidelete = false
      reply('Antidelete feature disabled.')
    } else {
      reply('Invalid argument. Use "on" or "off".')
    }
  } catch (e) {
    console.log(e)
    reply(`${e}`)
  }
})

messageDelete((mek) => {
  if (!global.antidelete) return
  
  const chatId = mek.key.remoteJid
  const senderId = mek.key.participant
  const senderName = mek.key.participant.split('@')[0]
  
  conn.sendMessage(chatId, `@${senderId} deleted a message!`, {
    mentions: [senderId]
  })
})
