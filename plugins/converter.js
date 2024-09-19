const config = require('../config');
const { cmd, commands } = require('../command');
const { sleep } = require('../lib/functions');

cmd({
  pattern: "sticker",
  react: "📦",
  desc: "Converts image to sticker",
  category: "converter",
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
    if (!mek.quoted) return reply("_Reply to an image!");
    const imageBuffer = await downloadMediaMessage(mek.quoted);
    const stickerBuffer = await convertImageToSticker(imageBuffer);
    await reply("_Converting image to sticker..._");
    await sleep(1000);
    await conn.sendMessage(from, stickerBuffer, MessageType.sticker, { quoted: mek });
  } catch (e) {
    console.log(e);
    reply(`${e}`);
  }
});

cmd({
  pattern: "photo",
  react: "📸",
  desc: "Converts sticker to image",
  category: "converter",
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
    if (!mek.quoted || !mek.quoted.sticker) return reply("_Reply to a sticker!");
    const stickerBuffer = await downloadMediaMessage(mek.quoted);
    const imageBuffer = await convertStickerToImage(stickerBuffer);
    await reply("_Converting sticker to image..._");
    await sleep(1000);
    await conn.sendMessage(from, imageBuffer, MessageType.image, { quoted: mek });
  } catch (e) {
    console.log(e);
    reply(`${e}`);
  }
});

cmd({
  pattern: "mp3",
  react: "🎵",
  desc: "Converts video to mp3",
  category: "converter",
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
    if (!mek.quoted) return reply("_Reply to a video!");
    const videoBuffer = await downloadMediaMessage(mek.quoted);
    const audioBuffer = await convertVideoToAudio(videoBuffer, 'mp3');
    await reply("_Converting video to mp3..._");
    await sleep(1000);
    await conn.sendMessage(from, audioBuffer, MessageType.audio, { mimetype: 'audio/mpeg', quoted: mek });
  } catch (e) {
    console.log(e);
    reply(`${e}`);
  }
});

cmd({
  pattern: "mp4",
  react: "📹",
  desc: "Converts video to mp4",
  category: "converter",
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
    if (!mek.quoted) return reply("_Reply to a video!");
    const videoBuffer = await downloadMediaMessage(mek.quoted);
    const videoBufferMp4 = await convertVideoToVideo(videoBuffer, 'mp4');
    await reply("_Converting video to mp4..._");
    await sleep(1000);
    await conn.sendMessage(from, videoBufferMp4, MessageType.video, { mimetype: 'video/mp4', quoted: mek });
  } catch (e) {
    console.log(e);
    reply(`${e}`);
  }
});
