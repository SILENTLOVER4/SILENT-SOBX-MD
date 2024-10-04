//   █▀▀▀ █  █ █  █ █▀▀█ █▀▀▀      █▀▄▀█ █▀▀▄ 
//   ▀▀▀█ █  █ █▀▀█ █▀▀█ ▀▀▀█  ▀▀  █ ▀ █ █  █
//   ▀▀▀▀ ▀▀▀▀ ▀  ▀ ▀  ▀ ▀▀▀▀      ▀   ▀ ▀▀▀



// * Project name - SUHAS- MD 
// * Author - Suhas Pathsindu
// * Team - Suhas Bro 
// * Version - V2

// World best and powerfull whatsapp user bot in Sri lanka
//🧬©ꜱᴜʜᴀꜱ-ᴍᴅ ʙʏ ꜱᴜᴀʜꜱ ᴘᴀᴛʜꜱɪɴᴅᴜッ



















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
if(!q) return reply("*කරුණාකර Link එකක් හො නමක් ලබා දෙන්න💫.*")
const search = await yts(q)
const data = search.videos[0]
const url = data.url

let desc = `*🎼SUHAS-MD SONG DOWNLOADER..📩*

🦄 ᴛɪᴛʟᴇ - ${data.title}

🦄 ᴠɪᴇᴡꜱ - ${data.views}

🦄 ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ - ${data.description}

🦄 ᴛɪᴍᴇ - ${data.timestamp}

🦄 ᴀɢᴏ - ${data.ago}

*🧬Don't Forget To Subscibe My YouTube Channel*
www.youtube.com/@suhasbro

*🧬Follow Your WhatsApp Channel*
https://www.whatsapp.com/channel/0029VagKNUe96H4IdMbr9f2o

*🧬©ꜱᴜʜᴀꜱ-ᴍᴅ ʙʏ ꜱᴜᴀʜꜱ ᴘᴀᴛʜꜱɪɴᴅᴜッ🇱🇰*
`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//=========== suhas md audio download ===========

let down = await fg.yta(url)  
let downloadUrl = down.dl_url

//send audio
await conn.sendMessage(from,{audio:{url: downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
await conn.sendMessage(from,{document:{url: downloadUrl},mimetype:"audio/mpeg",fileName:data.title + "mp3",caption:"MADE BY SUHAS-MD 🎵"},{quoted:mek})
}catch(e){
reply(`${e}`)
}
})

//=========== suhas md video-download ===========

cmd({
    pattern: "video",
    desc: "download video",
    category: "download",
    react: "📩",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("*කරුණාකර Link එකක් හො නමක් ලබා දෙන්න💫*")
const search = await yts(q)
const data = search.videos[0]
const url = data.url

let des = `*🎥SUHAS-MD VIDEO DOWNLOADER..📩*

🦄 ᴛɪᴛʟᴇ - ${data.title}

🦄 ᴠɪᴇᴡꜱ - ${data.views}

🦄 ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ - ${data.description}

🦄 ᴛɪᴍᴇ - ${data.timestamp}

🦄 ᴀɢᴏ - ${data.ago}

*🧬Don't Forget To Subscibe My YouTube Channel*
www.youtube.com/@suhasbro

*🧬Follow Your WhatsApp Channel*
https://www.whatsapp.com/channel/0029VagKNUe96H4IdMbr9f2o

*🧬©ꜱᴜʜᴀꜱ-ᴍᴅ ʙʏ ꜱᴜᴀʜꜱ ᴘᴀᴛʜꜱɪɴᴅᴜッ🇱🇰*                    
`
await conn.sendMessage(from,{image:{url: data.thumbnail},caption:des},{quoted:mek});

//download video

let down = await fg.ytv(url)  
let downloadUrl = down.dl_url

//send video
await conn.sendMessage(from,{video:{url: downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document:{url: downloadUrl},mimetype:"video/mp4",fileName:data.title + "mp4",caption:"MADE BY SUHAS-MD 🎬"},{quoted:mek})
    
}catch(a){
reply(`${a}`)
}
})
