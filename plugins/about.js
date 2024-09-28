const config = require('../config')
const {cmd , commands} = require('../command')

cmd({
    pattern: "about",
    desc: "About For SILENT MD.",
    category: "main",
    react: "🧟‍♂",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let des = `*👋 HELLO ${pushname}*\n\n *I AM SILENT LOVER 432*\n\n *I AM 19 YEARS OLD BOY 🔞*\n\n *I AM FROM PERSNOL HAI😁🙈*\n\n *I AM SIMPLE WHATSAPP BOT DEVELOPER👨‍💻*\n\n\n THANK YOU.😊`
return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: des},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})
