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



let about = ` *👋 HELLO.HOW ARE YOU? ${pushname}*

*🌐SILENT-SOBX-MD SUPPORT CHANNELS*

*🔷️WHATSAPP CHANNEL LINK:* https://whatsapp.com/channel/0029VaHO5B0G3R3cWkZN970s

*🌈YOUTUBE CHANNEL LINK :* https://youtube.com/@silentlover432?si=n3pYYLvSFLP7Shj7

*🧬SILENT-SOBX-MD BY SILENTLOVER432*`

return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption:about},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)

}

})
