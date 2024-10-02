const { bot, Mode, qrcode, isUrl, Bitly, removeBg, tinyurl, ssweb, shortenurl, upload, IronMan, ffmpeg, parseTimeToSeconds, convertInputsToPDF } = require('../lib');
const config = require('../config');
const { fromBuffer } = require('file-type');
const { MessageType } = require('baileys');

bot(
 {
  pattern: 'qr ?(.*)',
  fromMe: false,
  desc: 'Read/Write Qr.',
  type: 'tools',
 },
 async (message, match, m) => {
  match = match || message.reply_message?.text;
  if (match) {
   const buff = await qrcode(match);
   await message.send(buff, {}, 'image');
  } else if (message.reply_message?.image) {
   const buffer = await m.quoted.download();
   const data = await readQr(buffer);
   await message.send(data);
  } else {
   await message.sendReply(`\`\`\`Wrong Format\`\`\`\n\n${message.prefix}qr (Replied Image)\n\n${message.prefix}qr (text)`);
  }
 }
);

bot(
 {
  pattern: 'bitly ?(.*)',
  fromMe: false,
  desc: 'Converts Url to bitly',
  type: 'tools',
 },
 async (message, match) => {
  match = match || message.reply_message.text;
  if (!match) return await message.reply('_Reply to a url or enter a url_');
  if (!isUrl(match)) return await message.reply('_Not a url_');
  const short = await Bitly(match);
  return await message.reply(short.link);
 }
);

bot(
 {
  pattern: 'rmbg ?(.*)',
  fromMe: false,
  desc: 'Remove background of an image',
  type: 'tools',
 },
 async (message, match, m) => {
  if (!config.RMBG_API_KEY) return await message.sendReply('_API key not Set!_');
  if (!message.reply_message?.image) return await message.reply('Reply to an image');
  const msg = await message.reply('_Processing Image!_');
  const buff = await m.quoted.download();
  const buffer = await removeBg(buff);
  await msg.edit('*_Operation Success_*');
  await message.send(buffer);
 }
);

bot(
 {
  pattern: 'tiny ?(.*)',
  fromMe: false,
  desc: 'Shortens Link with TinyURL',
  type: 'tools',
 },
 async (message, match) => {
  match = match || message.reply_message.text;
  if (!match) return await message.sendReply(`\`\`\`Wrong format\n\n${message.prefix}tinyurl URL\n\nOR REPLY A MESSAGE\`\`\``);
  if (!isUrl(match)) return await message.sendReply('_Invalid URL_');
  const msg = await message.reply('_Shortening Link_');
  const shortenText = await tinyurl(match);
  await msg.edit('*_Operation Success_*');
  return await message.send(shortenText);
 }
);

bot(
 {
  pattern: 'ssweb ?(.*)',
  fromMe: false,
  desc: 'Screenshot Websites',
  type: 'tools',
 },
 async (message, match) => {
  if (!match) return await message.sendReply('_Provide URL_');
  if (!isUrl(match)) return await message.sendReply('_Not A URL_');
  const msg = await message.reply('_Processing URL_');
  const buff = await ssweb(match);
  await msg.edit('*_Success_*');
  return await message.send(buff);
 }
);

bot(
 {
  pattern: 'url ?(.*)',
  fromMe: false,
  desc: 'Shortens link URL',
  type: 'tools',
 },
 async (message, match) => {
  if (!match) return await message.sendReply('_Provide URL_');
  if (!isUrl(match)) return await message.sendReply('_Not A URL_');
  const msg = await message.reply('_Shortening Link_');
  const shortenedTxt = await shortenurl(match);
  await msg.edit('*_Success_*');
  return await message.send(shortenedTxt);
 }
);

bot(
 {
  pattern: 'upload ?(.*)',
  fromMe: false,
  desc: 'Uploads Image',
  type: 'tools',
 },
 async (message, match, m) => {
  if (!message.reply_message) return await message.reply('_Reply Image_');
  const msg = await message.reply('_Uploading File_');
  const buff = await m.quoted.download();
  const url = await upload(buff);
  return await msg.edit(`*IMAGE UPLOADED: ${url}*`);
 }
);

bot(
 {
  pattern: 'time ?(.*)',
  fromMe: false,
  desc: 'Find Time',
  type: 'tools',
 },
 async (message, match) => {
  if (!match) return await message.reply('*Need a place name to know time*\n_Example: .time japan_');
  var p = match.toLowerCase();
  const res = await fetch(IronMan(`ironman/search/time?loc=${p}`));
  const data = await res.json();
  if (data.error === 'no place') return await message.send('_*No place found*_');
  const { name, state, tz, capital, currCode, currName, phone } = data;
  const now = new Date();
  const format12hrs = { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  const format24hrs = { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const time12 = new Intl.DateTimeFormat('en-US', format12hrs).formatToParts(now);
  const time24 = new Intl.DateTimeFormat('en-US', format24hrs).formatToParts(now);
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
  let time12WithMs = '';
  time12.forEach(({ type, value }) => {
   if (type === 'dayPeriod') {
    time12WithMs += `:${milliseconds} ${value}`;
   } else {
    time12WithMs += value;
   }
  });
  const time24WithMs = time24.map(({ value }) => value).join('') + `:${milliseconds}`;
  let msg = `*ᴄᴜʀʀᴇɴᴛ ᴛɪᴍᴇ*\n(12-hour format): ${time12WithMs}\n(24-hour format): ${time24WithMs}\n`;
  msg += `*ʟᴏᴄᴀᴛɪᴏɴ:* ${name}\n`;
  if (state) {
   msg += `*ꜱᴛᴀᴛᴇ:* ${state}\n`;
  }
  msg += `*ᴄᴀᴘɪᴛᴀʟ:* ${capital}\n`;
  msg += `*ᴄᴜʀʀᴇɴᴄʏ:* ${currName} (${currCode})\n`;
  msg += `*ᴘʜᴏɴᴇ ᴄᴏᴅᴇ:* +${phone}`;
  await message.sendReply(msg);
 }
);

bot(
 {
  pattern: 'wame ?(.*)',
  fromMe: false,
  desc: 'wame generator',
  type: 'tools',
 },
 async (message, match) => {
  if (!message.quoted) return message.reply('_*Reply to a user*_');
  let sender = 'https://wa.me/' + (message.reply_message.sender || message.mention[0] || message.text).split('@')[0];
  await message.reply(sender);
 }
);

bot(
 {
  pattern: 'topdf',
  fromMe: false,
  info: 'Converts Text/Image to PDF',
  type: 'tools',
 },
 async (message, match, m, client) => {
  const text = match;
  let pdfBuffer;
  let imageBuffer = m.quoted ? await m.quoted.download() : null;
  if (text) {
   pdfBuffer = await convertInputsToPDF(text, 'text');
   await message.sendMessage(message.jid, pdfBuffer, { mimetype: 'application/pdf', fileName: `Generated by fxoprisa` }, 'document');
  } else if (imageBuffer) {
   pdfBuffer = await convertInputsToPDF(imageBuffer, 'image');
   await message.sendMessage(message.jid, pdfBuffer, { mimetype: 'application/pdf', fileName: `Generated by fxoprisa` }, 'document');
  } else {
   await message.sendMessage(message.jid, '_Provide text or quote an image to convert to PDF._');
  }
 }
);
