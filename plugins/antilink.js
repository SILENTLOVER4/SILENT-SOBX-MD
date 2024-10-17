const config = require('../config')
const { cmd, commands } = require('../command')

let antilinkStatus = true

cmd({
  pattern: "antilink",
  desc: "Toggle antilink feature",
  category: "group",
  react: "🚫",
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

cmd({
  pattern: "^(https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+~#?&//=]*))$",
  type: "regex",
  category: "group",
  react: "🚫",
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
    if (!isGroup) return
    if (!antilinkStatus) return
    
    const groupId = from
    const senderId = sender
    const senderName = pushname

    await conn.sendMessage(groupId, `@${senderId} has been removed for sending group link!`, {
      mentions: [senderId]
    })
    await conn.groupParticipantsUpdate(groupId, [senderId], 'remove')
  } catch (e) {
    console.log(e)
    reply(`${e}`)
  }
})
