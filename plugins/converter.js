const fs = require('fs');
const ff = require('fluent-ffmpeg');
const { Image } = require("node-webpmux");
const { fromBuffer } = require('file-type');
const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { exec } = require("child_process");
const axios = require("axios");
const {cmd , commands} = require('../command')


cmd({
    pattern: "photo",
    desc: "sticker to pjoto",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
   if (!message.reply_message?.sticker) return await message.reply("_Reply to a sticker_");
   if (message.reply_message.isAnimatedSticker) return await message.reply("_Reply to a non-animated sticker message_");
   let buffer = await webpToPng(await message.reply_message.downloadAndSave());
   return await message.send(buffer, {}, "image");
});

cmd({
    pattern: "mp3",
    desc: "mp3 video",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

   if (!(message.reply_message.video || message.reply_message.audio))
   return await message.reply("_Reply to audio or video_");	
   var audioResult = await toAudio(await message.reply_message.download());
   const [firstName, author, image] = config.AUDIO_DATA.split(";");
   const aud = await AddMp3Meta(audioResult, await getBuffer(image), { title: firstName, body: author });
   await message.reply(aud, { mimetype: "audio/mp4" }, "audio");
});


cmd({
    pattern: "ptv",
    desc: "video Change",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

   if (!message.video && !message.reply_message.video) return message.reply("_*Reply to a video*_");
   const buff = await message.downloadMediaMessage(message.video ? message.msg : message.quoted ? message.reply_message.msg : null);
   await message.reply(buff, { ptv: true }, "video");
});

cmd({
    pattern: "wawe",
    desc: "audio wawe",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

   if (!message.quoted || !message.reply_message?.audio && !message.reply_message?.video) return await message.reply("_Reply to an audio/video_");
   let media = await toAudio(await message.reply_message.download());
   return await message.send(media, { mimetype: 'audio/mpeg', ptt: true, quoted: message.data }, "audio");
});

cmd({
    pattern: "ptv",
    desc: "change sticker",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

   if (!message.reply_message?.sticker) return await message.reply("_Reply to a sticker_");
   if (!message.reply_message.isAnimatedSticker) return await message.reply("_Reply to an animated sticker message_");
   let buffer = await webp2mp4(await message.reply_message.download());
   return await message.send(buffer, {}, "video");
});

cmd({
    pattern: "gif",
    desc: "video Change",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

   if (!message.reply_message?.sticker) return await message.reply("_Reply to a sticker_");
   if (!message.reply_message.isAnimatedSticker) return await message.reply("_Reply to an animated sticker message_");
   const buffer = await webp2mp4(await message.reply_message.download());
   return await message.send(buffer, { gifPlayback: true }, "video");
});

cmd({
    pattern: "black",
    desc: "video Change",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

        const ffmpeg = ff();
        if (!message.reply_message?.audio) return await message.send("_Reply to an audio message_");
        const file = './lib/temp/media/black.jpg';
        const audioFile = './lib/temp/audio.mp3';
        fs.writeFileSync(audioFile, await message.reply_message.download());
        ffmpeg.input(file);
        ffmpeg.input(audioFile);
        ffmpeg.output('./lib/temp/videoMixed.mp4');
        ffmpeg.on('end', async () => {
            await message.send(fs.readFileSync('./lib/temp/videoMixed.mp4'), {}, 'video');
        });
        ffmpeg.on('error', async (err) => {
            console.error('FFmpeg error:', err);
            await message.reply("An error occurred during video conversion.");
        });
        ffmpeg.run();
});


cmd({
    pattern: "round",
    desc: "video Change",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

   if (!(msg.image || msg.reply_message.sticker || msg.reply_message.image)) return await msg.reply("_*Reply to photo or sticker*_");
   if (msg.reply_message.isAnimatedSticker) return await message.reply("_Reply to a non-animated sticker message_");
   let media = await msg.downloadMediaMessage(msg.image ? msg : msg.quoted ? msg.reply_message : null);
   let sticker = new Sticker(media, {
        pack: stickerPackNameParts[0], 
        author: stickerPackNameParts[1], 
        type: StickerTypes.ROUNDED ,
        categories: ["🤩", "🎉"], 
        id: "https://github.com/Loki-Xer/jarvis-md",
        quality: 75, 
   });
   const buffer = await sticker.toBuffer();
   await msg.reply(buffer, {}, "sticker");
});

cmd({
    pattern: "circle",
    desc: "video Change",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

   if (!(message.image || message.reply_message.sticker || message.reply_message.image)) return await message.reply("_*Reply to photo or sticker*_");
   if (message.reply_message.isAnimatedSticker) return await message.reply("_Reply to a non-animated sticker message_");
   let media = await message.downloadMediaMessage(message.image ? message : message.quoted ? message.reply_message : null);
   let sticker = new Sticker(media, {
        pack: stickerPackNameParts[0], 
        author: stickerPackNameParts[1], 
        type: StickerTypes.CIRCLE ,
        categories: ["🤩", "🎉"],
        id: "https://github.com/Loki-Xer/jarvis-md", 
        quality: 75,
   });
  const buffer = await sticker.toBuffer();
  await message.reply(buffer, {}, "sticker");
});


cmd({
    pattern: "crope",
    desc: "video Change",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

   if (!(msg.image || msg.reply_message.sticker || msg.reply_message.image)) return await msg.reply("_*Reply to photo or sticker*_");  
   if (msg.reply_message.isAnimatedSticker) return await msg.reply("_Reply to a non-animated sticker message_");
   let media = await msg.downloadMediaMessage(msg.image ? msg : msg.quoted ? msg.reply_message : null);
   let sticker = new Sticker(media, {
        pack: stickerPackNameParts[0], 
        author: stickerPackNameParts[1], 
        type: StickerTypes.CROPPED,
        categories: ["🤩", "🎉"],
        id: "https://github.com/Loki-Xer/jarvis-md", 
        quality: 75, 
   });
   const buffer = await sticker.toBuffer();
   await msg.reply(buffer, {}, "sticker");
});

cmd({
    pattern: "take",
    desc: "sticker pack Change",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

   let data;
   if (!message.reply_message || (!message.reply_message.sticker && !message.reply_message.audio)) return await message.reply("_Reply to a sticker or audio_");
   if (message.reply_message.sticker) {
   const stickerPackName = (match || config.STICKER_PACKNAME).split(";");
   await message.send(await message.reply_message.download(), { packname: stickerPackName[0], author: stickerPackName[1] }, "sticker");
   } else if (message.reply_message.audio) {
   const buff = await message.reply_message.download();
   const audioBuffer = Buffer.from(buff);
   const audioResult = await toAudio(audioBuffer, 'mp4');
   if (match) data = match.split(";");
   data = config.AUDIO_DATA.split(";");
   await message.reply(await AddMp3Meta(audioResult, await getBuffer(data[2]), { title: data[0], body: data[1] }), { mimetype: "audio/mp4" }, "audio");
}});


cmd({
    pattern: "sticker",
    desc: "photo to sticker Change",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

   if (!(message.image || message.video || message.reply_message.video || message.reply_message.image)) return await message.reply("_Reply to photo or video_"); 
   let media = (message.video || message.image)? message.msg : message.quoted? message.reply_message.msg : null;  
   let buff = await message.downloadMediaMessage(media);
   await message.send(buff, { packname: stickerPackNameParts[0], author: stickerPackNameParts[1] }, "sticker");
});

cmd({
    pattern: "exif",
    desc: "get exif data",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

   if (!message.reply_message || !message.reply_message.sticker)
   return await message.reply("_Reply to sticker_");
   let img = new Image();
   await img.load(await message.reply_message.download());
   const exif = JSON.parse(img.exif.slice(22).toString());
   const stickerPackId = exif['sticker-pack-id'];
   const stickerPackName = exif['sticker-pack-name'];
   const stickerPackPublisher = exif['sticker-pack-publisher'];
   const cap = (`*Sticker Pack ID -->* ${stickerPackId}\n\n*Pack name -->* ${stickerPackName}\n\n*Publisher Name -->* ${stickerPackPublisher}`)
   await message.reply(cap);
});

cmd({
    pattern: "aitts",
    desc: "converter",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

   if (match == 'list') 
   return await message.send(` *List of Aitts*\n\n 1 _rachel_ \n 2 _clyde_ \n 3 _domi_ \n 4 _dave_ \n 5 _fin_ \n 6 _bella_ \n 7 _antoni_ \n 8 _thomas_ \n 9 _charlie_ \n 10 _emily_ \n 11 _elli_ \n 12 _callum_ \n 13 _patrick_ \n 14 _harry_ \n 15 _liam_ \n 16 _dorothy_ \n 17 _josh_ \n 18 _arnold_ \n 19 _charlotte_ \n 20 _matilda_ \n 21 _matthew_ \n 22 _james_ \n 23 _joseph_ \n 24 _jeremy_ \n 25 _michael_ \n 26 _ethan_ \n 27 _gigi_ \n 28 _freya_ \n 29 _grace_ \n 30 _daniel_ \n 31 _serena_ \n 32 _adam_ \n 33 _nicole_ \n 34 _jessie_ \n 35 _ryan_ \n 36 _sam_ \n 37 _glinda_ \n 38 _giovanni_ \n 39 _mimi_ \n`.replace(/├/g, ''));
   const [v, k] = match.split(/,;|/);
   if (!k) return await message.send(`*_need voice id and text_*\n_example_\n\n_*aitts* hey vroh its a test,adam_\n_*aitts list*_`)
   const stream = await elevenlabs(match)
   if (!stream) return await message.send(`_*please upgrade your api key*_\n_get key from http://docs.elevenlabs.io/api-reference/quick-start/introduction_\n_example_\n\nsetvar elvenlabs: your key\n_or update your config.js manually_`);
   return await message.send({ stream }, { mimetype: 'audio/mpeg' }, 'audio');
});

cmd({
    pattern: "doc",
    desc: "Change media to doc",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

    match = (match || "converted media").replace(/[^A-Za-z0-9]/g,'-');
    if (!(message.image || message.video || (message.quoted && (message.reply_message.image || message.reply_message.audio || message.reply_message.video)))) return message.send("_*Reply to a video/audio/image message!*_");
    let msg = (message.video || message.image)? message.msg : message.quoted? message.reply_message.msg : null;  
    let media = await message.downloadMediaMessage(msg);
    const { ext, mime } = await fromBuffer(media);
    return await message.reply(media, { mimetype: mime, fileName: match + "." + ext }, "document");
});

cmd({
    pattern: "rotate",
    desc: "Change rotate",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

  if (!(message.image || message.video || (message.quoted && (message.reply_message.image || message.reply_message.video)))) return await message.reply('*Reply to an image/video*');
  const rmap = { 'left': 90, 'right': 180, 'vertical': 'vertical', 'horizontal': 'horizontal' };
  const rtype = match ? match.toLowerCase() : '';
  if (!rmap.hasOwnProperty(rtype)) return await message.reply('*Need rotation type.*\n_Example: .rotate left, right, vertical, or horizontal_');
  const option = rmap[rtype];
  const url = await GraphOrg(await message.reply_message.downloadAndSaveMedia());
  await message.sendFromUrl(IronMan(`ironman/convert/rotate?image=${url}&option=${option}`));
});

cmd({
    pattern: "tovv",
    desc: "Change media to vv",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

    if (!(message.image && message.video && (message.quoted && (message.reply_message.image || message.reply_message.audio || message.reply_message.video)))) return await message.client.forwardMessage(message.jid, message.image || message.video? message : message.reply_message, { viewOnce: true });
    await message.reply("_*Reply to an image, video, or audio to make it viewable*_");
});

cmd({
    pattern: "url",
    desc: "video Change",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

    if (!message.reply_message.i || (!message.reply_message.image && !message.reply_message.video && !message.reply_message.audio && !message.reply_message.sticker)) return await message.reply('*Reply to image,video,audio,sticker*');
    return await sendUrl(message);
});


cmd({
    pattern: "rbg",
    desc: "video Change",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

   if (match && match.includes("key")) {
        await setData(m.user.id, match.split(":")[1].trim(), "true", "removeBg");
        return m.reply("*Key added successfully. Now you can use rbg.*");
    }
    if (!m.image && !m.reply_message.image) return m.reply("*Reply to an image*");
    const db = await getData(m.user.id);
    if (!db.removeBg) return await m.send("https://graph.org/file/dc22fb232b0092e6326ec.png", { type: "image", value: [{ name: "cta_url", display_text: "Sign in", url: "https://accounts.kaleido.ai/users/sign_in", merchant_url: "https://accounts.kaleido.ai/users/sign_in", action: "url", icon: "", style: "link" }, { name: "cta_url", display_text: "Get API Key", url: "https://www.remove.bg/dashboard#api-key", merchant_url: "https://www.remove.bg/dashboard#api-key", action: "url", icon: "", style: "link" }], body: "", footer: "*JARVIS-MD*", title: `\nDear user, get an API key to use this command. Sign in to remove.bg and get an API key. After that, use \n\n *${m.prefix} rbg key: _your API key_*\n` }, "button");
    let buff = await removeBg(await m.downloadAndSaveMediaMessage(m.image ? m.msg : m.quoted ? m.reply_message.msg : null), db.removeBg.message);
    if(!buff) return m.reply("*Error in api key or can't upload to remove.bg*");
    await m.reply(buff, {}, "image");
});

cmd({
    pattern: "bitly",
    desc: "video Change",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

    const longUrl = match || message.reply_message.text;
    if (!longUrl) return await message.reply('*Please provide a URL to shorten.*');
    const response = await bitly(longUrl);
    const shortUrl = response.link;
    await message.send(`*SHORT URL:* ${shortUrl}`, { quoted: message.data });
});


cmd({
    pattern: "trt1",
    desc: "video Change",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

  match = message.reply_message.text || match;
  if (!match) return await message.reply("_provide text to translate *eg: i am fine;ml*_");
  const text = match.split(";");
  try {
      const result = await translate(text[0], {tld: "co.in", to: text[1] || config.LANG, from: text[2] || "auto" });
      return await message.reply(result.join());
  } catch (error) {
      await message.reply('_' + error.message + '_');
  };
});

cmd({
    pattern: "qc",
    desc: "video Change",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!match) match = message.reply_message.text ? message.reply_message.text : match;
  if(!match) return await message.reply(" *EXAMPLE:.qc Hi! ; name*\n _Or reply to a message_")
  
const image = await message.client.profilePictureUrl(m.sender, 'image');
const thumb = await message.client.profilePictureUrl(m.sender, 'image');
const number = message.user.jid;
    const logo = await getBuffer(image);
    const thumbnail = await getBuffer(thumb);
    let q = {
        key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast"
        },
        message: {
            contactMessage: {
                displayName: `${message.pushName}`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${message.client.user.name},;;;\nFN:${message.client.user.name},\nitem1.TEL;waid=${number.split('@')[0]}:${number.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
                jpegThumbnail: thumbnail
            }
        }
    };
  let pp;
  try { pp = await message.client.profilePictureUrl(message.quoted ? message.reply_message.sender : message.sender, 'image'); } catch { pp = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }
const [text, name] = match.split(';')
  if (text.length > 100) return await message.reply(' *Max 80 characters*')
   const obj = {
    type: 'quote',
    format: 'png',
    backgroundColor: '#1e2b33',
    width: 512,
    height: 512,
    scale: 2,
    messages: [
      {
        avatar: true,
        from: {
          name: name || await message.store.getName(message.quoted ? message.reply_message.sender : message.sender),
          photo: { url: pp },
        },
        text: text || message.reply_message.text,
        replyMessage: {},
      },
    ],
  }
  const response = await axios.post('https://bot.lyo.su/quote/generate', obj, {
    headers: { 'Content-Type': 'application/json' },
  })
  const img = Buffer.from(response.data.result.image, 'base64')
  await message.send(img, { quoted: q }, "sticker");
});
