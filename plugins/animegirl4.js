//   █▀▀▀ █  █ █  █ █▀▀█ █▀▀▀      █▀▄▀█ █▀▀▄ 
//   ▀▀▀█ █  █ █▀▀█ █▀▀█ ▀▀▀█  ▀▀  █ ▀ █ █  █
//   ▀▀▀▀ ▀▀▀▀ ▀  ▀ ▀  ▀ ▀▀▀▀      ▀   ▀ ▀▀▀



// * Project name - SUHAS- MD 
// * Author - Suhas Pathsindu
// * Team - Suhas Bro 
// * Version - V2

// World best and powerfull whatsapp user bot in Sri lanka
//🧬©ꜱᴜʜᴀꜱ-ᴍᴅ ʙʏ ꜱᴜᴀʜꜱ ᴘᴀᴛʜꜱɪɴᴅᴜッ








const axios = require('axios');
const { cmd, commands } = require('../command');

cmd({
    pattern: "animegirl4",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "👧",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '👸 *SUHAS-MD Random Anime Girl Images* 👸\n\n\n *🧬©ꜱᴜʜᴀꜱ-ᴍᴅ ʙʏ ꜱᴜᴀʜꜱ ᴘᴀᴛʜꜱɪɴᴅᴜッ🇱🇰*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

