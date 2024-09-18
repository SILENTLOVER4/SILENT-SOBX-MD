const Jimp = require('jimp');

cmd({
  pattern: "sticker",
  react: "📦",
  desc: "Convert image to sticker",
  category: "convert",
  filename: __filename
}, async (conn, mek, m, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!mek.quoted || !mek.quoted.image) return reply("Reply to an image!");
    const imageBuffer = await downloadMediaMessage(mek.quoted);
    const image = await Jimp.read(imageBuffer);
    image.resize(512, 512);
    image.quality(90);
    const stickerBuffer = await image.getBufferAsync(Jimp.MIME_WEBP);
    return await conn.sendMessage(from, stickerBuffer, MessageType.sticker, { quoted: mek });
  } catch (e) {
    console.log(e);
    reply(`${e}`);
  }
});
