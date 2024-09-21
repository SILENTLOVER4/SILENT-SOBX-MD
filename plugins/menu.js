const {readEnv} = require('../lib/database')
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
const config = await readEnv();
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
menu[commands[i].category] += `➺${commands[i].pattern}\n`;
 }
}

let madeMenu = `🐬 *ʜᴇʟʟᴏ ${pushname}*
✨ *Welcome to ${botname}* ✨🌟
╭━━━⊱ 👤 *USER* 👤 ⊱━━━╮
🖋️ *Name:* _%name_
╰━━━━━━━━━━━━━━━━╯

╭━━━⊱ 🌐 *INFO* 🌐 ⊱━━━╮
⛑️ *Mode:* _%mode_
📱 *Platform:* _%platform_
💻 *Type:* _NodeJs_
🛡️ *Baileys:* _Multi Device_
🔑 *Prefix:* [ *%_p* ]
⏳ *Uptime:* _%muptime_
💾 *Database:* _%totalreg_
╰━━━━━━━━━━━━━━━━━━╯
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

await conn.sendMessage(from,{image:{url:config.ALIVE_IMG},caption:madeMenu},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
