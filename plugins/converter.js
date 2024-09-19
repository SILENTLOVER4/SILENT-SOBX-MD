const config = require("../config");
const { Module, mode, toAudio, webp2mp4, fancy } = require("../lib");

Module(
	{
		pattern: "sticker",
		fromMe: mode,
		desc: "Converts Photo/video/text to sticker",
		type: "converter",
	},
	async (message, match, m) => {
		if (!message.reply_message) return await message.reply("_Reply Photo/Video_");
		const buff = await m.quoted.download();
		const [packname, author] = config.STICKER_PACK.split(";");
		message.sendMessage(message.jid, buff, { packname, author }, "sticker");
	},
);

Module(
	{
		pattern: "take",
		fromMe: mode,
		desc: "Converts Photo or video to sticker",
		type: "converter",
	},
	async (message, match, m) => {
		if (!message.reply_message.sticker) return await message.reply("_Reply to a sticker_");

		const [packname, author] = config.STICKER_PACK.split(";");
		const buff = await m.quoted.download();
		message.sendMessage(message.jid, buff, { packname, author }, "sticker");
	},
);

Module(
	{
		pattern: "photo",
		fromMe: mode,
		desc: "Changes sticker to Photo",
		type: "converter",
	},
	async (message, match, m) => {
		if (!message.reply_message.sticker) return await message.reply("_Not a sticker_");

		const buff = await m.quoted.download();
		return await message.send(buff);
	},
);

Module(
	{
		pattern: "mp3",
		fromMe: mode,
		desc: "Converts video/voice to mp3",
		type: "converter",
	},
	async (message, match, m) => {
		let buff = await m.quoted.download();
		buff = await toAudio(buff, "mp3");
		return await message.send(buff);
	},
);

Module(
	{
		pattern: "mp4",
		fromMe: mode,
		desc: "Converts video/voice to mp4",
		type: "converter",
	},
	async (message, match, m) => {
		if (!message.reply_message.video && !message.reply_message.sticker && !message.reply_message.audio) return await message.reply("_Reply to a sticker/audio/video_");

		let buff = await m.quoted.download();
		buff = message.reply_message.sticker ? await webp2mp4(buff) : await toAudio(buff, "mp4");
		return await message.send(buff);
	},
);

Module(
	{
		pattern: "img",
		fromMe: mode,
		desc: "Converts Sticker to image",
		type: "converter",
	},
	async (message, match, m) => {
		if (!message.reply_message.sticker) return await message.reply("_Reply to a sticker_");

		const buff = await m.quoted.download();
		return await message.send(buff);
	},
);

Module(
	{
		pattern: "fancy",
		fromMe: mode,
		desc: "Converts Normal text to Fancy Rubbish",
		type: "converter",
	},
	async (message, match) => {
		if (!match) return await message.sendReply("```Wrong format!\n\n" + message.prefix + "fancy Astro```");

		const fancy_text = await fancy(match);
		return await message.send(fancy_text);
	},
);
