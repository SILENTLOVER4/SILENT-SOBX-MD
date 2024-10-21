const axios = require('axios');
const config = require('../config'); // Make sure to add your API key here
const { cmd, commands } = require('../command');
const fs = require('fs');
const path = require('path');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson} = require('../lib/functions');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const googleTTS = require("google-tts-api");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const { tmpdir } = require("os")
const Crypto = require("crypto")
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg')
let { img2url } = require('@blackamda/telegram-image-url');
ffmpeg.setFfmpegPath(ffmpegPath);
async function videoToWebp (media) {
    const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`)
    const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`)
    fs.writeFileSync(tmpFileIn, media)
    await new Promise((resolve, reject) => {
        ffmpeg(tmpFileIn)
            .on("error", reject)
            .on("end", () => resolve(true))
            .addOutputOptions([
                "-vcodec",
                "libwebp",
                "-vf",
                "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
                "-loop",
                "0",
                "-ss",
                "00:00:00",
                "-t",
                "00:00:05",
                "-preset",
                "default",
                "-an",
                "-vsync",
                "0"
            ])
            .toFormat("webp")
            .save(tmpFileOut)
    })
    const buff = fs.readFileSync(tmpFileOut)
    fs.unlinkSync(tmpFileOut)
    fs.unlinkSync(tmpFileIn)
    return buff
}
function toAudio(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-ac', '2',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'mp3'
  ], ext, 'mp3')
}
function toPTT(buffer, ext) {
  return ffmpeg(buffer, [
    '-vn',
    '-c:a', 'libopus',
    '-b:a', '128k',
    '-vbr', 'on',
    '-compression_level', '10'
  ], ext, 'opus')
}
function toVideo(buffer, ext) {
  return ffmpeg(buffer, [
    '-c:v', 'libx264',
    '-c:a', 'aac',
    '-ab', '128k',
    '-ar', '44100',
    '-crf', '32',
    '-preset', 'slow'
  ], ext, 'mp4')
}
cmd({
            pattern: "tts",
            react: "💭",
            desc: "q to speech.",
            category: "convert",
            filename: __filename,
            use: '<Hii,this is Secktor>',
       },
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,  isSachintha, isSavi, isSadas, isMani, isMe,isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner && !isSachintha && !isSavi && !isSadas && !isMani && !isMe)return;
    try{
        async(mek, m, q) => {
            if (!q) return reply('Please give me Sentence to change into audio.')
            let qtts = q
            const ttsurl = googleTTS.getAudioUrl(qtts, {
                lang: "en",
                slow: false,
                host: "https://translate.google.com",
            });
            return mek.sendMessage(m.chat, {
                audio: {
                    url: ttsurl,
                },
                mimetype: "audio/mpeg",
                fileName: `ttsmmek.m4a`,
            }, {
                quoted: m,
            });
        }
                
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "toptt",
    react: "🔊",
    alias: ["toaudio","tomp3"],
    desc: "convert to audio",
    category: "convert",
    use: '.toptt <Reply to video>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    let isquotedvid = m.quoted ? (m.quoted.type === 'videoMessage') : m ? (m.type === 'videoMessage') : false
    if(!isquotedvid) return await reply()
    let media = m.quoted ? await m.quoted.download() : await m.download()
    let auddio = await toPTT(media, 'mp4')
    let senda =  await conn.sendMessage(m.chat, {audio: auddio.options, mimetype:'audio/mpeg'}, {quoted:m})
    await conn.sendMessage(from, { react: { text: '🎼', key: senda.key }})
} catch (e) {
reply('*Error !!*')
l(e)
}
})       



});
 cmd({
    pattern: "img2url",
    react: "🔗",
    alias: ["tourl","imgurl","telegraph","imgtourl"],
    desc: "to convert image to url",
    category: "convert",
    use: '.img2url <reply image>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
    const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
    const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
    if ((m.type === 'imageMessage') || isQuotedImage) {
const fileType = require("file-type");
  var nameJpg = getRandom('');
  let buff = isQuotedImage ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
  let type = await fileType.fromBuffer(buff);
  await fs.promises.writeFile("./" + type.ext, buff);
  img2url("./" + type.ext).then(async url => {
    await reply('\n' + url + '\n');
});
    } else return reply()
} catch (e) {
  reply();
  l(e);
}
}); 


cmd({
    pattern: "trt",
    desc: "🌍 Translate text between languages",
    react: "🌐",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) return reply("❗ Please provide a language code and text. Usage: .translate [language code] [text]");
        const targetLang = args[0];
        const textToTranslate = args.slice(1).join(' ');
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;
        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;
        const translationMessage = `
🌍 *Translation* 🌍
🔤 *Original*: ${textToTranslate}
🔠 *Translated*: ${translation}
🌐 *Language*: ${targetLang.toUpperCase()}
*POWERED BY SILENTLOVER432-`;
        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while translating the text. Please try again later.");
    }
});
