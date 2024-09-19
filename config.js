const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID,
STICKER_PACK: process.env.AUTHOR || "Astro;FXBOTTO",
MONGODB: process.env.MONGODB || "enter mongodb url",
};
