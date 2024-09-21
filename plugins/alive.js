const { readEnv } = require('../lib/database');
const { cmd, commands } = require('../command');

// Define command configuration
cmd({
  pattern: /^alive$/i,
  react: '🥰',
  desc: 'Check bot online status and information.',
  category: 'main',
  filename: __filename,
}, 
async (conn, mek, m, {
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
  reply,
}) => {
  try {
    // Read environment variables
    const config = await readEnv();

    // Bot information
    const botInfo = `
      • Bot Name: ${config.BOT_NAME}
      • Bot Version: ${config.BOT_VERSION}
      • Uptime: ${process.uptime()} seconds
      • Node.js Version: ${process.version}
      • Platform: ${process.platform}
    `;

    // Send alive message with image and caption
    return await conn.sendMessage(from, {
      image: { url: config.ALIVE_IMG },
      caption: `${config.ALIVE_MSG}\n\n${botInfo}`,
    }, { quoted: mek });
  } catch (e) {
    console.log(e);
    reply(`${e}`);
  }
});
