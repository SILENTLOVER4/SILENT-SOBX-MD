const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    jidNormalizedUser,
    getContentType,
    fetchLatestBaileysVersion,
    Browsers
} = require('@whiskeysockets/baileys');

const l = console.log;
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions');
const fs = require('fs');
const P = require('pino');
const config = require('./config');
const qrcode = require('qrcode-terminal');
const StickersTypes = require('wa-sticker-formatter');
const util = require('util');
const { sms, downloadMediaMessage } = require('./lib/msg');
const axios = require('axios');
const { File } = require('megajs');

const ownerNumber = ['923096287432'];

//===================SESSION-AUTH============================
if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
    if (!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!');
    const sessdata = config.SESSION_ID;
    const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
    filer.download((err, data) => {
        if (err) throw err;
        fs.writeFile(__dirname + '/auth_info_baileys/creds.json', data, () => {
            console.log("Session downloaded ✅");
        });
    });
}

const express = require("express");
const app = express();
const port = process.env.PORT || 9090;

//=============================================

async function connectToWA() {
    //===================connect mongodb===================
    const connectDB = require('./lib/mongodb');
    connectDB();
    //==================================
    const { readEnv } = require('./lib/database');
    const config = await readEnv();
    const prefix = ('.');
    //=================================

    console.log("ᴄᴏɴɴᴇᴄᴛɪɴɢ sɪʟᴇɴᴛ-sᴏʙx-ᴍᴅ ʙᴏᴛ 🧬...");
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/');
    var { version } = await fetchLatestBaileysVersion();

    const conn = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: false,
        browser: Browsers.macOS("Firefox"),
        syncFullHistory: true,
        auth: state,
        version
    });

    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
                connectToWA();
            }
        } else if (connection === 'open') {
            console.log('😼 ɪɴsᴛᴀʟʟɪɴɢ ᴘʟᴜɢɪɴs ғɪʟᴇs ᴘʟᴇᴀsᴇ ᴡᴀɪᴛ... ');

            const path = require('path');
            fs.readdirSync("./plugins/").forEach((plugin) => {
                if (path.extname(plugin).toLowerCase() == ".js") {
                    require("./plugins/" + plugin);
                }
            });

            console.log('ᴘʟᴜɢɪɴs ɪɴsᴛᴀʟʟᴇᴅ sᴜᴄᴄᴇssғᴜʟʟʏ ✅');
            console.log('sɪʟᴇɴᴛ-sᴏʙx-ᴍᴅ ᴄᴏɴɴᴇᴄᴛᴇᴅ ᴛᴏ ᴡʜᴀᴛsᴀᴘᴘ ✅');

            let up = `➺sɪʟᴇɴᴛ-sᴏʙx-ᴍᴅ ᴄᴏɴɴᴇᴄᴛᴇᴅ sᴜᴄᴄᴇssғᴜʟʟʏ ᴛʏᴘᴇ .ᴍᴇɴᴜ ᴛᴏ ᴄᴏᴍᴍᴀɴᴅ ʟɪsᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ sɪʟᴇɴᴛ ʟᴏᴠᴇʀ⁴³²✅

*❁ᴊᴏɪɴ ᴏᴜʀ ᴡʜᴀᴛsᴀᴘᴘ ᴄʜᴀɴɴᴇʟ ғᴏʀ ᴜᴘᴅᴀᴛᴇs sɪʟᴇɴᴛ-sᴏʙx-ᴍᴅ❁*

https://whatsapp.com/channel/0029VaHO5B0G3R3cWkZN970s🔰

*❁ᴊᴏɪɴ ᴏᴜʀ ʏᴏᴜᴛᴜʙᴇ ᴄʜᴀɴɴᴇʟ ғᴏʀ ᴜᴘᴅᴀᴛᴇs sɪʟᴇɴᴛ-sᴏʙx-ᴍᴅ❁*

https://youtube.com/@silentlover432?si=n3pYYLvSFLP7Shj7🔰

╭⊱✫🔮✠sɪʟᴇɴᴛ-sᴏʙx-ᴍᴅ🔮✫⊱╮
│✫ - *📂Repository Name:* SILENT-SOBX-MD
│✫ - *📃Description:* ❁ᴡᴏʀʟᴅ ʙᴇsᴛ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ❁
│✫ - *🛡️Owner:* sɪʟᴇɴᴛ ʟᴏᴠᴇʀ⁴³²
│✫ - *🌐 URL:* https://github.com/SILENTLOVER4/SILENT-SOBX-MD
╰━━━━━━━━━━━━━━━━━╯

YOUR BOT ACTIVE NOW ENJOY♥️🪄\n\nPREFIX: ${prefix}`;
            conn.sendMessage(ownerNumber + "@s.whatsapp.net", { image: { url: `https://telegra.ph/file/2a06381b260c3f096a612.jpg` }, caption: up });
        }
    });

    conn.ev.on('creds.update', saveCreds);

    // Safeguarding the messages.upsert event handler
    conn.ev.on('messages.upsert', async (mek) => {
        try {
            mek = mek.messages[0];
            if (!mek.message) return;

            mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message;

            if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === "true") {
                await conn.readMessages([mek.key]);
            }

            const m = sms(conn, mek);
            const type = getContentType(mek.message);
            const from = mek.key.remoteJid;
            const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ?
                mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : [];
            const body = (type === 'conversation') ? mek.message.conversation :
                (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text :
                (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption :
                (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : '';
            const isCmd = body.startsWith(prefix);
            const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
            const args = body.trim().split(/ +/).slice(1);
            const q = args.join(' ');
            const isGroup = from.endsWith('@g.us');
            const sender = mek.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid);
            const senderNumber = sender.split('@')[0];
            const botNumber = conn.user.id.split(':')[0];

            const groupMetadata = isGroup ? await conn.groupMetadata(from) : '';
            const groupName = isGroup ? groupMetadata.subject : '';
            const groupMembers = isGroup ? groupMetadata.participants : '';
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : '';
            const isBotGroupAdmins = groupAdmins.includes(botNumber);
            const isGroupAdmins = groupAdmins.includes(sender);

            if (isCmd) l({ command, sender: senderNumber, isGroup });

            switch (command) {
                case 'menu':
                    let buttons = [
                        { buttonId: `.alive`, buttonText: { displayText: 'STATUS BOT 🛡️' }, type: 1 },
                        { buttonId: `.ping`, buttonText: { displayText: 'SPEED TEST 📶' }, type: 1 },
                    ];
                    await conn.sendMessage(from, {
                        image: { url: 'https://telegra.ph/file/2a06381b260c3f096a612.jpg' },
                        caption: 'Here is the bot menu!',
                        footer: 'Silent Sobx MD',
                        buttons: buttons,
                        headerType: 4
                    });
                    break;
                default:
                    if (isGroup && !isCmd) {
                        console.log('Group chat message received but no command matched.');
                    } else {
                        console.log('Message received but no command matched.');
                    }
                    break;
            }
        } catch (err) {
            console.error('Error in message handler: ', err);
        }
    });
}

connectToWA();

app.get("/", (req, res) => {
    res.send('Server is running. Please connect using WhatsApp.');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
