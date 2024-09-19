const fs = require('fs');
const Jimp = require('jimp');
const { MessageType } = require('@adiwajshing/baileys');

const convertPlugin = {
  name: 'Converter',
  description: 'Convert photo to sticker, sticker to photo, video to voice mp3, video to voice mp4, and normal text to fancy text',
  version: '1.0',
  author: 'SilentLover4',
};

const convertPhotoToSticker = async (conn, mek, m) => {
  if (!mek.quoted) return conn.sendMessage(m.from, "_Reply to an image!", MessageType.text, { quoted: mek });
  const imageBuffer = await downloadMediaMessage(mek.quoted);
  const stickerBuffer = await convertImageToSticker(imageBuffer);
  return await conn.sendMessage(m.from, stickerBuffer, MessageType.sticker, { quoted: mek });
};

const convertStickerToPhoto = async (conn, mek, m) => {
  if (!mek.quoted || !mek.quoted.sticker) return conn.sendMessage(m.from, "_Reply to a sticker!", MessageType.text, { quoted: mek });
  const stickerBuffer = await downloadMediaMessage(mek.quoted);
  const imageBuffer = await convertStickerToImage(stickerBuffer);
  return await conn.sendMessage(m.from, imageBuffer, MessageType.image, { quoted: mek });
};

const convertVideoToMp3 = async (conn, mek, m) => {
  if (!mek.quoted) return conn.sendMessage(m.from, "_Reply to a video!", MessageType.text, { quoted: mek });
  const videoBuffer = await downloadMediaMessage(mek.quoted);
  const audioBuffer = await convertVideoToAudio(videoBuffer, 'mp3');
  return await conn.sendMessage(m.from, audioBuffer, MessageType.audio, { mimetype: 'audio/mpeg', quoted: mek });
};

const convertVideoToMp4 = async (conn, mek, m) => {
  if (!mek.quoted) return conn.sendMessage(m.from, "_Reply to a video!", MessageType.text, { quoted: mek });
  const videoBuffer = await downloadMediaMessage(mek.quoted);
  const videoBufferMp4 = await convertVideoToVideo(videoBuffer, 'mp4');
  return await conn.sendMessage(m.from, videoBufferMp4, MessageType.video, { mimetype: 'video/mp4', quoted: mek });
};

const convertTextToFancy = async (conn, mek, m) => {
  if (!mek.body) return conn.sendMessage(m.from, "_Provide text to convert!", MessageType.text, { quoted: mek });
  const text = mek.body;
  const fancyText = await convertTextToFancy(text);
  return await conn.sendMessage(m.from, fancyText, MessageType.text, { quoted: mek });
};

module.exports = {
  pattern: ["^sticker$", "^photo$", "^mp3$", "^mp4$", "^fancy$"],
  desc: convertPlugin.description,
  fromMe: true,
  category: "converter",
  handler: async (conn, mek, m) => {
    switch (m.body.toLowerCase()) {
      case ".sticker":
        await convertPhotoToSticker(conn, mek, m);
        break;
      case ".photo":
        await convertStickerToPhoto(conn, mek, m);
        break;
      case ".mp3":
        await convertVideoToMp3(conn, mek, m);
        break;
      case ".mp4":
        await convertVideoToMp4(conn, mek, m);
        break;
      case ".fancy":
        await convertTextToFancy(conn, mek, m);
        break;
      default:
        return;
    }
  },
};
