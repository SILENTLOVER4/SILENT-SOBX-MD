const config = require('../config');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { cmd } = require('../command');
const { getRandom } = require('../lib/functions');
const fs = require('fs').promises; // Use promises to handle file operations

var imgmsg = config.LANG === 'SI' ? 'ඡායාරූපයකට mention දෙන්න!' : 'ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴘʜᴏᴛᴏ ғᴏʀ sᴛɪᴄᴋᴇʀ!';
var descg = config.LANG === 'SI' ? 'එය ඔබගේ mention දුන් ඡායාරූපය ස්ටිකර් බවට පරිවර්තනය කරයි.' : 'ɪᴛ ᴄᴏɴᴠᴇʀᴛs ʏᴏᴜʀ ʀᴇᴘʟɪᴇᴅ ᴘʜᴏᴛᴏ ᴛᴏ sᴛɪᴄᴋᴇʀ.';

cmd({
    pattern: 'sticker',
    react: '🤹‍♀️',
    alias: ['s', 'stic'],
    desc: descg,
    category: 'convert',
    use: '.sticker <Reply to image>',
    filename: __filename
}, async (conn, mek, m, { from, reply, command, args, q, isGroup, pushname }) => {
    try {
        const isQuotedImage = m.quoted && (m.quoted.type === 'imageMessage' || (m.quoted.type === 'viewOnceMessage' && m.quoted.msg.type === 'imageMessage'));
        const isQuotedSticker = m.quoted && m.quoted.type === 'stickerMessage';
        const isQuotedGif = m.quoted && m.quoted.type === 'videoMessage' && m.quoted.mimetype === 'video/mp4';

        if ((m.type === 'imageMessage') || isQuotedImage) {
            const nameJpg = getRandom('.jpg');
            const imageBuffer = isQuotedImage ? await m.quoted.download() : await m.download();
            await fs.writeFile(nameJpg, imageBuffer);

            let sticker = new Sticker(nameJpg, {
                pack: pushname,
                author: '',
                type: q.includes('--crop') || q.includes('-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                categories: ['🤩', '🎉'],
                id: '12345',
                quality: 75,
                background: 'transparent',
            });

            const buffer = await sticker.toBuffer();
            return conn.sendMessage(from, { sticker: buffer }, { quoted: mek });
        } else if (isQuotedSticker) {
            const nameWebp = getRandom('.webp');
            const stickerBuffer = await m.quoted.download();
            await fs.writeFile(nameWebp, stickerBuffer);

            let sticker = new Sticker(nameWebp, {
                pack: pushname,
                author: '',
                type: q.includes('--crop') || q.includes('-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                categories: ['🤩', '🎉'],
                id: '12345',
                quality: 75,
                background: 'transparent',
            });

            const buffer = await sticker.toBuffer();
            return conn.sendMessage(from, { sticker: buffer }, { quoted: mek });
        } else if (isQuotedGif) {
            const nameGif = getRandom('.gif');
            const gifBuffer = await m.quoted.download();
            await fs.writeFile(nameGif, gifBuffer);

            // Optionally convert the GIF to a sticker or handle as needed
            let sticker = new Sticker(nameGif, {
                pack: pushname,
                author: '',
                type: StickerTypes.FULL,
                categories: ['🤩', '🎉'],
                id: '12345',
                quality: 75,
                background: 'transparent',
            });

            const buffer = await sticker.toBuffer();
            return conn.sendMessage(from, { sticker: buffer }, { quoted: mek });
        } else {
            return await reply(imgmsg);
        }
    } catch (e) {
        reply('Error !!');
        console.error(e);
    }
});
