const { cmd, commands } = require('../command');
const config = require('../config')

cmd({
    pattern: "downmenu",
    react: "⬇👨‍💻",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*● ══════════════ ●*

   *UMAR Ai DOWNLOAD COMMANDS MENU*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'download'){
  if(!commands[i].dontAddCommandList){
menuc += `*📍➣Command :* ${commands[i].pattern}
*📃➣Desc :* ${commands[i].desc}
*⌛➣Use:* ${commands[i].use}\n\n`
}}};

let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'ʙᴏᴛ ꜱᴄʀɪᴘᴛ'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'ᴜᴍᴀʀ ᴀɪ ꜱᴘᴇᴇᴅ'
    },
    type: 1
  }]
  let buttonMessaged = {
    image: { url: `https://i.imgur.com/9WgnDo0.jpeg` },
    caption: menuc,
    footer: `ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴜᴍᴀʀ ᴀɪ ʙʏ ᴅᴀʀᴋ ᴅᴇᴠɪʟ`,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "searchmenu",
    react: "👨‍💻",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menuc = `*● ══════════════ ●*

   *SILENT Ai SEARCH COMMANDS MENU*\n\n`
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'search'){
  if(!commands[i].dontAddCommandList){
menuc += `*📍➣Command :* ${commands[i].pattern}
*📃➣Desc :* ${commands[i].desc}
*⌛➣Use:* ${commands[i].use}\n\n`
}}};
let generatebutton = [{
    buttonId: `${prefix}sc`,
    buttonText: {
        displayText: 'ʙᴏᴛ ꜱᴄʀɪᴘᴛ'
    },
    type: 1
  },{
    buttonId: `${prefix}ping`,
    buttonText: {
        displayText: 'SILENT-SOBX-MD SPEED'
    },
    type: 1
  }]
    image: { url: `https://i.imgur.com/9WgnDo0.jpg` },
    caption: menuc,
    footer: `ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴜᴍᴀʀ ᴀɪ ʙʏ ᴅᴀʀᴋ ᴅᴇᴠɪʟ`,
    headerType: 4,
    buttons: generatebutton
  };
  return await conn.buttonMessage(from, buttonMessaged, mek);
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
