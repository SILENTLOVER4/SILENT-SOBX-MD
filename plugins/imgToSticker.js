const Jimp = require('jimp');
const { WhatsApp } = require('whatsapp-web.js');

module.exports = (bot) => {
  bot.on('message', async (msg) => {
    if (msg.type === 'image') {
      const imageBuffer = await msg.download();
      const sticker = await convertImageToSticker(imageBuffer);
      bot.sendMessage(sticker, { caption: 'Your sticker!' });
    }
  });
};

async function convertImageToSticker(imageBuffer) {
  const image = await Jimp.read(imageBuffer);
  image.resize(512, 512); // sticker size
  image.quality(90); // quality

  // Add sticker background (optional)
  const background = await Jimp.read('sticker-background.png');
  image.composite(background, 0, 0);

  // Convert image to sticker format (WebP)
  const stickerBuffer = await image.getBufferAsync(Jimp.MIME_WEBP);
  return stickerBuffer;
    }
