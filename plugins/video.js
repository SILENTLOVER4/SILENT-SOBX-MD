const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')

cmd({
    pattern: "song",
    desc: "download songs",
    category: "download",
    react: "📩",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("*Please provide a link or a name💫.*")
const search = await yts(q)
const data = search.videos[0]
const url = data.url

let desc = `*🎼UMAR SONG DOWNLOADER..📩*

🦄 ᴛɪᴛʟᴇ - ${data.title}

🦄 ᴠɪᴇᴡꜱ - ${data.views}

🦄 ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ - ${data.description}

🦄 ᴛɪᴍᴇ - ${data.timestamp}

🦄 ᴀɢᴏ - ${data.ago}

*🧬Don't Forget To Subscibe My YouTube Channel*
https://youtube.com/@silentlover432

*🧬Follow Your WhatsApp Channel*
https://whatsapp.com/channel/0029VaHO5B0G3R3cWkZN970s

*UMAR CREATION*
`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//=========== umar audio download ===========

let down = await fg.yta(url)  
let downloadUrl = down.dl_url

//send audio
await conn.sendMessage(from,{audio:{url: downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
await conn.sendMessage(from,{document:{url: downloadUrl},mimetype:"audio/mpeg",fileName:data.title + "mp3",caption:"MADE BY SUHAS-MD 🎵"},{quoted:mek})
}catch(e){
reply(`${e}`)
}
})

//=========== umar video-download ===========

cmd({
    pattern: "video",
    desc: "download video",
    category: "download",
    react: "📩",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("*Please provide a link or a name💫*")
const search = await yts(q)
const data = search.videos[0]
const url = data.url

let des = `*🎥UMAR VIDEO DOWNLOADER..📩*

🦄 ᴛɪᴛʟᴇ - ${data.title}

🦄 ᴠɪᴇᴡꜱ - ${data.views}

🦄 ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ - ${data.description}

🦄 ᴛɪᴍᴇ - ${data.timestamp}

🦄 ᴀɢᴏ - ${data.ago}

*🧬Don't Forget To Subscibe My YouTube Channel*
https://youtube.com/@silentlover432

*🧬Follow Your WhatsApp Channel*
https://whatsapp.com/channel/0029VaHO5B0G3R3cWkZN970s
*UMAR CREATION*                    
`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:des},{quoted:mek});

//download video

let down = await fg.ytv(url)  
let downloadUrl = down.dl_url

//send video
await conn.sendMessage(from,{video:{url: downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document:{url: downloadUrl},mimetype:"video/mp4",fileName:data.title + "mp4",caption:"MADE BY UMAR 🎬"},{quoted:mek})
    
}catch(a){
reply(`${a}`)
}
})
