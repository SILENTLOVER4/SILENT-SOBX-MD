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
cmd({
    pattern: "support",
    desc: "To get the bot informations.",
    react: "😸",
    category: "main",
    filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{



let about = ` *👋 Hello.How are You? ${pushname}*

*🦄 *SUHAS-MD Support Channels* 🦄

*🌈Whatsapp Channel Link:* ➸ https://whatsapp.com/channel/0029VagKNUe96H4IdMbr9f2o

*🌈YouTube Channel Link:* ➸ https://youtube.com/@suhasbro

*🧬©ꜱᴜʜᴀꜱ-ᴍᴅ ʙʏ ꜱᴜᴀʜꜱ ᴘᴀᴛʜꜱɪɴᴅᴜッ🇱🇰*`

return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption:about},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)

}

})
