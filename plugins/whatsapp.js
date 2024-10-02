const { bot, Mode, serialize, loadMessage, parsedJid, getName } = require('../lib');
const { DELETED_LOG_CHAT, DELETED_LOG } = require('../config');

bot(
 {
  pattern: 'vv',
  fromMe: false,
  info: 'Downloads ViewOnce Messages',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  if (!m.quoted) return await message.sendReply('_Reply ViewOnce Message_');
  var buff;
  buff = await m.quoted.download();
  return await message.send(buff);
 }
);
bot(
 {
  pattern: 'setpp',
  fromMe: true,
  desc: 'Set profile picture',
  type: 'whatsapp',
 },
 async (message, match, m) => {
  if (!message.reply_message.image) return await message.reply('_Reply to a photo_');
  let buff = await m.quoted.download();
  await message.setPP(message.user, buff);
  return await message.reply('_Profile Picture Updated_');
 }
);

bot(
 {
  pattern: 'setname',
  fromMe: true,
  desc: 'Set User name',
  type: 'whatsapp',
 },
 async (message, match) => {
  if (!match) return await message.reply('_Enter name_');
  await message.updateName(match);
  return await message.reply(`_Username Updated : ${match}_`);
 }
);

bot(
 {
  pattern: 'block',
  fromMe: true,
  desc: 'Block a person',
  type: 'whatsapp',
 },
 async (message, match) => {
  if (message.isGroup) {
   let jid = message.mention[0] || message.reply_message.jid;
   if (!jid) return await message.reply('_Reply to a person or mention_');
   await message.block(jid);
   return await message.sendMessage(`_@${jid.split('@')[0]} Blocked_`, {
    mentions: [jid],
   });
  } else {
   await message.reply('_Blocked_');
   return await message.block(message.jid);
  }
 }
);

bot(
 {
  pattern: 'unblock',
  fromMe: true,
  desc: 'Unblock a person',
  type: 'whatsapp',
 },
 async (message, match) => {
  if (message.isGroup) {
   let jid = message.mention[0] || message.reply_message.jid;
   if (!jid) return await message.reply('_Reply to a person or mention_');
   await message.block(jid);
   return await message.sendMessage(message.jid, `_@${jid.split('@')[0]} unblocked_`, {
    mentions: [jid],
   });
  } else {
   await message.unblock(message.jid);
   return await message.reply('_User unblocked_');
  }
 }
);

bot(
 {
  pattern: 'jid',
  fromMe: true,
  desc: 'Give jid of chat/user',
  type: 'whatsapp',
 },
 async (message, match) => {
  return await message.sendMessage(message.jid, message.mention[0] || message.reply_message.jid || message.jid);
 }
);

bot(
 {
  pattern: 'dlt ?(.*)',
  fromMe: true,
  desc: 'Deletes a message',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  if (!message.reply_message) return await message.reply('_Reply Message_');
  await client.sendMessage(message.jid, { delete: message.reply_message.key });
 }
);

bot(
 {
  pattern: 'quoted',
  fromMe: false,
  desc: 'quoted message',
 },
 async (message, match) => {
  if (!message.reply_message) return await message.reply('*Reply to a message*');
  let key = message.reply_message.key;
  let msg = await loadMessage(key.id);
  if (!msg) return await message.reply('_Message not found maybe bot might not be running at that time_');
  msg = await serialize(JSON.parse(JSON.stringify(msg.message)), message.client);
  if (!msg.quoted) return await message.reply('No quoted message found');
  await message.forward(message.jid, msg.quoted.message);
 }
);

bot(
 {
  pattern: 'save ?(.*)',
  fromMe: true,
  desc: 'Saves WhatsApp Status',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  if (!message.reply_message?.image && !message.reply_message.video && !message.reply_message.audio) return await message.sendReply('_Reply Status_');
  return await message.fdMsg(message.user, m.quoted);
 }
);

bot(
 {
  pattern: 'forward ?(.*)',
  fromMe: false,
  desc: 'Forward Message.',
  type: 'whatsapp',
 },
 async (message, match, m) => {
  if (!m.quoted) return await message.reply('Reply to a message to forward');
  let jids = parsedJid(match);
  let quotedMsg = m;
  for (const jid of jids) await message.fdMSg(jid, m.quoted.message, { quoted: quotedMsg });
  return await message.sendReply('_Forwarded to ' + match + '_');
 }
);

bot(
 {
  pattern: 'fullforward ?(.*)',
  fromMe: false,
  desc: 'Forwards the replied message (any type)',
  type: 'whatsapp',
 },
 async (message, match, m) => {
  if (!m.quoted) return await message.reply('Reply to a message to forward');
  let jids = parsedJid(match);
  for (const jid of jids) await message.forward(jid, m.quoted);
  return await message.sendReply('_Forwarded to ' + match + '_');
 }
);

bot(
 {
  pattern: 'edit ?(.*)',
  fromMe: true,
  desc: 'Edit message sent by the bot',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  if (!message.reply_message) return await message.reply('_Reply Message From You_');
  return await message.reply_message.edit(match, { key: message.reply_message.key });
 }
);

bot(
 {
  on: 'delete',
  fromMe: false,
  desc: 'Logs the recent deleted message',
 },
 async (message, match) => {
  if (!DELETED_LOG) return;
  if (!DELETED_LOG_CHAT) return await message.sendMessage(message.user, 'Please set DELETED_LOG_CHAT in ENV to use log delete message');
  let msg = await loadMessage(message.messageId);
  if (!msg) return;
  msg = await serialize(JSON.parse(JSON.stringify(msg.message)), message.client);
  if (!msg) return await message.reply('No deleted message found');
  let deleted = await message.forward(message.user, DELETED_LOG_CHAT, msg.message);
  var name;
  if (!msg.from.endsWith('@g.us')) {
   let getname = await getName(msg.from);
   name = `_Name : ${getname}_`;
  } else {
   let gname = (await message.client.groupMetadata(msg.from)).subject;
   let getname = await getName(msg.sender);
   name = `_Group : ${gname}_\n_Name : ${getname}_`;
  }
  return await message.sendMessage(DELETED_LOG_CHAT, `_Message Deleted_\n_From : ${msg.from}_\n${name}\n_SenderJid : ${msg.sender}_`, { quoted: deleted });
 }
);
