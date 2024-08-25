const config = require('../config')
const {cmd , commands} = require('../command')

cmd({
    pattern: "menu",
    react: "🍂",
    desc: "get cmd list",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
search: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `.${commands[i].pattern}\n`;
 }
}

let madeMenu = `🐬 *ʜᴇʟʟᴏ ${pushname}*
> *❂ᴅᴏᴡɴʟᴏᴀᴅ ᴄᴏᴍᴍᴀɴᴅs❂*

${menu.download}

> *❂ᴍᴀɪɴ ᴄᴏᴍᴍᴀɴᴅs❂*

${menu.main}

> *❂ɢʀᴏᴜᴘ ᴄᴏᴍᴍᴀɴᴅs❂*

${menu.group}

> *❂ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅs❂*

${menu.owner}

> *❂ᴄᴏɴᴠᴇʀᴛ ᴄᴏᴍᴍᴀɴᴅs❂*

${menu.convert}

> *❂sᴇᴀʀᴄʜ ᴄᴏᴍᴍᴀɴᴅs❂*

${menu.search}

ᴘᴏᴡᴇʀᴇᴅ ʙʏ sɪʟᴇɴᴛ_ʟᴏᴠᴇʀ⁴³²
`

await conn.sendMessage(from,{image:{url:"https://telegra.ph/file/2a06381b260c3f096a612.jpg"},caption:madeMenu},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
