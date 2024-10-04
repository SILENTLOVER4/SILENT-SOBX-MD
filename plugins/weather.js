//   █▀▀▀ █  █ █  █ █▀▀█ █▀▀▀      █▀▄▀█ █▀▀▄ 
//   ▀▀▀█ █  █ █▀▀█ █▀▀█ ▀▀▀█  ▀▀  █ ▀ █ █  █
//   ▀▀▀▀ ▀▀▀▀ ▀  ▀ ▀  ▀ ▀▀▀▀      ▀   ▀ ▀▀▀



// * Project name - SUHAS- MD 
// * Author - Suhas Pathsindu
// * Team - Suhas Bro 
// * Version - V2

// World best and powerfull whatsapp user bot in Sri lanka
//🧬©ꜱᴜʜᴀꜱ-ᴍᴅ ʙʏ ꜱᴜᴀʜꜱ ᴘᴀᴛʜꜱɪɴᴅᴜッ








const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "weather",
    desc: "🌤 Get weather information for a location",
    react: "🌥️",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❗ Please provide a city name..Usage: .weather [city name]");

        const apiKey = '2d61a72574c11c4f36173b627f8cb177'; 
        const city = q;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        const weather = `
🌍 *SUHAS-MD Weather Information for ${data.name}, ${data.sys.country}* 🌍

🌡️ *Temperature*: ${data.main.temp}°C

🌡️ *Feels Like*: ${data.main.feels_like}°C

🌡️ *Min Temp*: ${data.main.temp_min}°C

🌡️ *Max Temp*: ${data.main.temp_max}°C

💧 *Humidity*: ${data.main.humidity}%

☁️ *Weather*: ${data.weather[0].main}

🌫️ *Description*: ${data.weather[0].description}

💨 *Wind Speed*: ${data.wind.speed} m/s

📌 *Pressure*: ${data.main.pressure} hPa

*🧬©ꜱᴜʜᴀꜱ-ᴍᴅ ʙʏ ꜱᴜᴀʜꜱ ᴘᴀᴛʜꜱɪɴᴅᴜッ🇱🇰*
`;

        return reply(weather);
    } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 ¢ιту ησт ƒσυη∂. ρℓєαѕє ¢нє¢к тнє ѕρєℓℓιηg αη∂ тяу αgαιη.");
        }
        return reply("⚠️ An error. Please try again later🤕");
    }
});
