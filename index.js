// ... (rest of your code remains the same)

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, jidNormalizedUser, getContentType, fetchLatestBaileysVersion, Browsers } = require('@whiskeysockets/baileys')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions')
const fs = require('fs')
const P = require('pino')
const config = require('./config')
const qrcode = require('qrcode-terminal')
const util = require('util')
const { sms, downloadMediaMessage } = require('./lib/msg')
const axios = require('axios')
const { File } = require('megajs')
const ownerNumber = ['923096287432']
const Jimp = require('jimp'); // Added Jimp library

// ... (rest of your code remains the same)

async function convertImageToSticker(imageBuffer) {
  const image = await Jimp.read(imageBuffer);
  image.resize(512, 512); // sticker size
  image.quality(90); // quality
  // Add sticker background (optional)
  // const background = await Jimp.read('sticker-background.png');
  // image.composite(background, 0, 0);
  const stickerBuffer = await image.getBufferAsync(Jimp.MIME_WEBP);
  return stickerBuffer;
}

// ... (rest of your code remains the same)

conn.ev.on('messages.upsert', async (mek) => {
  mek = mek.messages[0]
  if (!mek.message) return
  mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
  if (mek.key && mek.key.remoteJid === 'status@broadcast') return
  const m = sms(conn, mek)
  const type = getContentType(mek.message)
  const content = JSON.stringify(mek.message)
  const from = mek.key.remoteJid
  const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
  const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
  const isCmd = body.startsWith(prefix)
  const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
  const args = body.trim().split(/ +/).slice(1)
  const q = args.join(' ')
  const isGroup = from.endsWith('@g.us')
  const sender = mek.key.fromMe ? ((link unavailable).split(':')[0] + '@s.whatsapp.net' || (link unavailable)) : (mek.key.participant || mek.key.remoteJid)
  const senderNumber = sender.split('@')[0]
  const botNumber = (link unavailable).split(':')[0]
  const pushname = mek.pushName || 'Sin Nombre'
  const isMe = botNumber.includes(senderNumber)
  const isOwner = ownerNumber.includes(senderNumber) || isMe
  const botNumber2 = await jidNormalizedUser((link unavailable));
  const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
  const groupName = isGroup ? groupMetadata.subject : ''
  const participants = isGroup ? await groupMetadata.participants : ''
  const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
  const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
  const isAdmins = isGroup ? groupAdmins.includes(sender) : false
  const reply = (teks) => {
    conn.sendMessage(from, {
      text: teks
    }, {
      quoted: mek
    })
  }
  conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
    let mime = '';
    let res = await axios.head(url)
    mime = res.headers['content-type']
    if (mime.split("/")[1] === "gif") {
      return conn.sendMessage(jid, {
        video: await getBuffer(url),
        caption: caption,
        gifPlayback: true,
        ...options
      }, {
        quoted: quoted,
        ...options
      })
    }
    let type = mime.split("/")[0] + "Message"
    if (mime === "application/pdf") {
      return conn.sendMessage(jid,
