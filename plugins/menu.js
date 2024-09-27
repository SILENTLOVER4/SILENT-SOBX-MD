const { cmd, commands } = require('../command');
const config = require('../config');

// Command: downmenu
cmd({
    pattern: "downmenu",
    react: "⬇👨‍💻",
    dontAddCommandList: true,
    filename: __filename
},
async (conn, mek, m, { from, prefix, l, reply }) => {
    try {
        let menuc = `*● ══════════════ ●*\n\n   *UMAR Ai DOWNLOAD COMMANDS MENU*\n\n`;

        // Loop through commands and create menu for 'download' category
        for (let i = 0; i < commands.length; i++) { 
            if (commands[i].category === 'download' && !commands[i].dontAddCommandList) {
                menuc += `*📍➣Command:* ${commands[i].pattern}\n*📃➣Desc:* ${commands[i].desc}\n*⌛➣Use:* ${commands[i].use}\n\n`;
            }
        }

        // Create buttons
        let generatebutton = [
            {
                buttonId: `${prefix}sc`,
                buttonText: { displayText: 'ʙᴏᴛ ꜱᴄʀɪᴘᴛ' },
                type: 1
            },
            {
                buttonId: `${prefix}ping`,
                buttonText: { displayText: 'ᴜᴍᴀʀ ᴀɪ ꜱᴘᴇᴇᴅ' },
                type: 1
            }
        ];

        // Message with buttons
        let buttonMessaged = {
            image: { url: `https://i.imgur.com/9WgnDo0.jpeg` },
            caption: menuc,
            footer: `ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴜᴍᴀʀ ᴀɪ ʙʏ ᴅᴀʀᴋ ᴅᴇᴠɪʟ`,
            headerType: 4,
            buttons: generatebutton
        };

        // Send button message
        return await conn.buttonMessage(from, buttonMessaged, mek);
    } catch (e) {
        reply('*ERROR !!*');
        if (l) l(e); // Ensure `l` is defined (likely a logger function)
    }
});

// Command: searchmenu
cmd({
    pattern: "searchmenu",
    react: "👨‍💻",
    dontAddCommandList: true,
    filename: __filename
},
async (conn, mek, m, { from, prefix, l, reply }) => {
    try {
        let menuc = `*● ══════════════ ●*\n\n   *SILENT Ai SEARCH COMMANDS MENU*\n\n`;

        // Loop through commands and create menu for 'search' category
        for (let i = 0; i < commands.length; i++) { 
            if (commands[i].category === 'search' && !commands[i].dontAddCommandList) {
                menuc += `*📍➣Command:* ${commands[i].pattern}\n*📃➣Desc:* ${commands[i].desc}\n*⌛➣Use:* ${commands[i].use}\n\n`;
            }
        }

        // Create buttons
        let generatebutton = [
            {
                buttonId: `${prefix}sc`,
                buttonText: { displayText: 'ʙᴏᴛ ꜱᴄʀɪᴘᴛ' },
                type: 1
            },
            {
                buttonId: `${prefix}ping`,
                buttonText: { displayText: 'SILENT-SOBX-MD SPEED' },
                type: 1
            }
        ];

        // Message with buttons
        let buttonMessaged = {
            image: { url: `https://i.imgur.com/9WgnDo0.jpg` },
            caption: menuc,
            footer: `ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴜᴍᴀʀ ᴀɪ ʙʏ ᴅᴀʀᴋ ᴅᴇᴠɪʟ`,
            headerType: 4,
            buttons: generatebutton
        };

        // Send button message
        return await conn.buttonMessage(from, buttonMessaged, mek);
    } catch (e) {
        reply('*ERROR !!*');
        if (l) l(e); // Ensure `l` is defined (likely a logger function)
    }
});
