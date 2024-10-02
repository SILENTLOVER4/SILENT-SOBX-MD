const { bot, parsedJid, saveWarn, resetWarn, getFilter, setFilter, deleteFilter } = require('../lib');
const { PausedChats } = require('../lib/Store');
const { WARN_COUNT } = require('../config');
bot(
 {
  pattern: 'pause',
  fromMe: true,
  desc: 'Pause the chat',
  type: 'user',
 },
 async (message) => {
  await PausedChats.savePausedChat(message.key.remoteJid);
  message.reply('_Commands Paused In this Chat_');
 }
);

bot(
 {
  pattern: 'resume',
  fromMe: true,
  desc: 'Resume the paused chat',
  type: 'user',
 },
 async (message) => {
  const id = message.key.remoteJid;
  const pausedChat = await PausedChats.PausedChats.findOne({ where: { chatId: id } });
  if (pausedChat) await pausedChat.destroy(), message.reply('_Commands Enabled for this Chat_');
  else message.reply('_Commands Were not disabled_');
 }
);

bot(
 {
  pattern: 'warn',
  fromMe: true,
  desc: 'Warn a user',
  type: 'user',
 },
 async (message, match, m, client) => {
  const id = message.mention[0] || message.reply_message.jid;
  if (!id) return message.reply('_Mention or reply to someone_');
  let reason = message?.reply_message.text || match;
  reason = reason.replace(/@(\d+)/, '');
  reason = reason ? reason.length <= 1 : 'Reason not Provided';
  const warnInfo = await saveWarn(id, reason);
  let userWarnCount = warnInfo ? warnInfo.warnCount : 0;
  userWarnCount++;
  await message.reply(`_User @${id.split('@')[0]} warned._ \n_Warn Count: ${userWarnCount}._ \n_Reason: ${reason}_`, { mentions: [id] });
  if (userWarnCount > WARN_COUNT) {
   const jid = parsedJid(id);
   await message.sendMessage(message.jid, 'Warn limit exceeded kicking user');
   return await client.groupParticipantsUpdate(message.jid, jid, 'remove');
  }
  return;
 }
);

bot(
 {
  pattern: 'rwarn',
  fromMe: true,
  desc: 'Reset warnings for a user',
  type: 'user',
 },
 async (message) => {
  const id = message.mention[0] || message.reply_message.jid;
  if (!id) return message.reply('_Mention or reply to someone_');
  await resetWarn(id);
  return await message.reply(`_Warnings for @${id.split('@')[0]} reset_`, {
   mentions: [id],
  });
 }
);

bot(
 {
  pattern: 'filter',
  fromMe: true,
  desc: 'Adds a filter. When someone triggers the filter, it sends the corresponding response. To view your filter list, use `.filter`.',
  type: 'user',
 },
 async (message, match) => {
  let text, msg;
  try {
   [text, msg] = match.split(':');
  } catch {}
  if (!match) {
   filtreler = await getFilter(message.jid);
   if (filtreler === false) {
    await message.reply('No filters are currently set in this chat.');
   } else {
    var mesaj = 'Your active filters for this chat:' + '\n\n';
    filtreler.map((filter) => (mesaj += `✒ ${filter.dataValues.pattern}\n`));
    mesaj += 'use : .filter keyword:message\nto set a filter';
    await message.reply(mesaj);
   }
  } else if (!text || !msg) {
   return await message.reply('```use : .filter keyword:message\nto set a filter```');
  } else {
   await setFilter(message.jid, text, msg, true);
   return await message.reply(`_Sucessfully set filter for ${text}_`);
  }
 }
);

bot(
 {
  pattern: 'fstop',
  fromMe: true,
  desc: 'Stops a previously added filter.',
  type: 'user',
 },
 async (message, match) => {
  if (!match) return await message.reply('\n*Example:* ```.stop hello```');

  del = await deleteFilter(message.jid, match);
  await message.reply(`_Filter ${match} deleted_`);

  if (!del) {
   await message.reply('No existing filter matches the provided input.');
  }
 }
);

bot(
 {
  on: 'text',
  fromMe: false,
  dontAddCommandList: true,
 },
 async (message, match) => {
  var filtreler = await getFilter(message.jid);
  if (!filtreler) return;
  filtreler.map(async (filter) => {
   pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : '\\b(' + filter.dataValues.pattern + ')\\b', 'gm');
   if (pattern.test(match)) {
    return await message.reply(filter.dataValues.text, {
     quoted: message,
    });
   }
  });
 }
);
