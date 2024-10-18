const { 
  conn, 
  cmd, 
  commands 
} = require('../index')

let antilinkStatus = true

cmd({
  pattern: "antilink",
  desc: "Toggle antilink feature",
  category: "group",
  react: "🔗",
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
    if (!isGroup) return reply('This command can only be used in a group.')
    if (!isAdmins) return reply('You must be an admin to use this command.')
    
    const arg = args.join(' ')
    if (arg === 'on') {
      antilinkStatus = true
      reply('Antilink feature enabled.')
    } else if (arg === 'off') {
      antilinkStatus = false
      reply('Antilink feature disabled.')
    } else {
      reply('Invalid argument. Use "on" or "off".')
    }
  } catch (e) {
    console.log(e)
    reply(`${e}`)
  }
})

conn.on('message', async (m) => {
  try {
    if (!antilinkStatus) return
    if (!m.key.remoteJid.endsWith('@g.us')) return
    if (m.messageStubType === 'group_invite') {
      const groupId = m.key.remoteJid
      const senderId = m.participant
      const senderName = m.pushName

      await conn.sendMessage(groupId, `@${senderId} has been removed for sending group link!`, {
        mentions: [senderId]
      })
      await conn.groupParticipantsUpdate(groupId, [senderId], 'remove')
    }
  } catch (e) {
    console.log(e)
  }
})
