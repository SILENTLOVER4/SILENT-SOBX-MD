const fs = require('fs');

// Define command
cmd({
  pattern: 'sticker',
  react: '🥺',
  alias: ['s', 'stic'],
  desc: 'Convert image to sticker.',
  category: 'convert',
  use: '.sticker <Reply to image>',
  filename: __filename,
}, 
async (conn, mek, m, {
  from,
  reply,
  isCmd,
  command,
  args,
  q,
  isGroup,
  pushname,
}) => {
  try {
    // Check if quoted image
    const isQuotedImage = m.quoted && (m.quoted.type === 'imageMessage' || (m.quoted.type === 'viewOnceMessage' && m.quoted.msg.type === 'imageMessage'));

    // Convert image to sticker
    if ((m.type === 'imageMessage') || isQuotedImage) {
      const imageBuffer = isQuotedImage ? await m.quoted.download() : await m.download();
      const stickerBuffer = await convertImageToSticker(imageBuffer);
      return conn.sendMessage(from, { sticker: stickerBuffer }, { quoted: mek });
    } 
    // Handle invalid input
    else {
      return await reply('*Reply to an image!*');
    }
  } catch (e) {
    reply('*Error !!*');
    console.error(e);
  }
});

// Convert image to sticker function
async function convertImageToSticker(imageBuffer) {
  // Create canvas
  const canvas = Canvas.createCanvas(512, 512);
  const ctx = canvas.getContext('2d');

  // Load image
  const img = await Canvas.loadImage(imageBuffer);

  // Draw image on canvas
  ctx.drawImage(img, 0, 0, 512, 512);

  // Convert canvas to buffer
  const stickerBuffer = canvas.toBuffer('image/webp', { quality: 90 });

  return stickerBuffer;
}
