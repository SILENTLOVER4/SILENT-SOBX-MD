//   █▀▀▀ █  █ █  █ █▀▀█ █▀▀▀      █▀▄▀█ █▀▀▄ 
//   ▀▀▀█ █  █ █▀▀█ █▀▀█ ▀▀▀█  ▀▀  █ ▀ █ █  █
//   ▀▀▀▀ ▀▀▀▀ ▀  ▀ ▀  ▀ ▀▀▀▀      ▀   ▀ ▀▀▀



// * Project name - SUHAS- MD 
// * Author - Suhas Pathsindu
// * Team - Suhas Bro 
// * Version - V2

// World best and powerfull whatsapp user bot in Sri lanka
//🧬©ꜱᴜʜᴀꜱ-ᴍᴅ ʙʏ ꜱᴜᴀʜꜱ ᴘᴀᴛʜꜱɪɴᴅᴜッ








const config = require('../config')
const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "gpt",
    desc: "ai",
    category: "main",
    react: "🧠",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let data = await fetchJson(`https://chatgptforprabath-md.vercel.app/api/gptv1?q=${q}`)
reply(`${data.data}`)
}catch(e){
console.log(e)
reply(`${e}`)
}
})
