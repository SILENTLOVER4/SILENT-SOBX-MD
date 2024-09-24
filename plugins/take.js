pattern: "take",
  fromMe: mode,
  desc: "Converts Photo or video to sticker",
  type: "converter"
 },
 async (message, match, m) => {
  if (!message.reply_message.sticker) return await message.reply("_Reply to a sticker_");

  const [packname, author] = config.STICKER_PACK.split(";");
  let buff = await m.quoted.download();
  message.sendMessage(message.chat, buff, { packname, author }, "sticker");
 }
);
