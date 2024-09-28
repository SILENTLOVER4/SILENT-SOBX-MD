const config = require('../config')
const {cmd , commands} = require('../command')

cmd({
    pattern: "about",
    desc: "About For Umar Ai.",
    category: "main",
    react: "🧟‍♂",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let des = `*👋 Hello ${pushname}*\n\n *I am Umar Rehman*\n\n *I am 18 years old Boy🔞*\n\n *I am from Rawalpindi *\n\n *I am Simple WhatsApp Bot Developer👨‍💻*\n\n\n Thank You.😊`
return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: des},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})
