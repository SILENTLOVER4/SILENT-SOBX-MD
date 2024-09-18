const { MessageType } = require('@whiskeysockets/baileys');
const Jimp = require('jimp');

async function convertImageToSticker(imageBuffer) {
  const image = await Jimp.read(imageBuffer);
  image.resize(512, 512); 
  image.quality(90); 
  const stickerBuffer = await image.getBufferAsync(Jimp.MIME_WEBP);
  return stickerBuffer;
}

module.exports = {
  name: 'sticker',
  alias: ['stik'],
  description: 'Convert image to sticker',
  category: 'convert',
  async execute(mek, conn) {
    if (!mek.quoted || !mek.quoted.image) return;
    const imageBuffer = await downloadMediaMessage(mek.quoted);
    const sticker = await convertImageToSticker(imageBuffer);
    conn.sendMessage(mek.from, sticker, MessageType.sticker);
  },
  handler: async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    if (body.startsWith('.sticker') || body.startsWith('.stik')) {
      await this.execute(mek, conn);
    }
  }
};
