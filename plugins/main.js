const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
const config = require('../config')
cmd({
    pattern: "setting",
    desc: "Check bot setting.",
    react: "⚙️",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let setting = `
*╭──────────────●●►*
 *SILENT-SOBX-MD SETTINGS MENU* ⚙️
*╰──────────────●●►*
*╭───────────────────●●►*
*│◈ ALIVE_IMG:* .update ALIVE_IMG: Imgurl 
*│◈ ALIVE_MSG:* .update ALIVE_MSG: Hello , I am alive now!!
*│◈ PREFIX:* .update PREFIX: .
*│◈ AUTO_READ_STATUS:* .update AUTO_READ_STATUS: true
*│◈ MODE:* .update MODE: public
*│◈ AUTO_VOICE:* .update AUTO_VOICE: true
*│◈ AUTO_STICKER:* .update AUTO_STICKER: true
*│◈ AUTO_REPLY:* .update AUTO_REPLY: true
*│◈ ANTI_BAD_WORD:* .update ANTI_BAD_WORD: true
*│◈ ANTI_LINK:* .update ANTI_LINK: true
*│◈ WELCOME_GOODBAY:* .update WELCOME_GOODBAY: true
*│◈ ALLWAYS_OFFLINE:* .update ALLWAYS_OFFLINE: false
*│◈ READ_CMD:* .update READ_CMD: true
*╰──────────────────●●►*
> BY *SILENTLOVER432*
`;
return await conn.sendMessage(from,{text:setting },{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})
