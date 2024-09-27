const fetch = require('node-fetch');
const axios = require('axios');
const config = require('../config')

// Replace these with your GitHub credentials
const userName = 'Um4r719';
const token = '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';
const repoName = 'umar-db';

// Function to fetch data from GitHub API
async function githubApiRequest(url, method = 'GET', data = {}) {
  try {
    const options = {
      method,
      headers: {
        Authorization: `Basic ${Buffer.from(`${userName}:${token}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    };

    if (method === 'GET' || method === 'HEAD') {
      // Remove the body property for GET and HEAD requests
      delete options.body;
    } else {
      // For other methods (POST, PUT, DELETE, etc.), add the JSON.stringify data to the request body
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    return await response.json();
  } catch (error) {
    throw new Error(`GitHub API request failed: ${error.message}`);
  }
}


async function checkRepoAvailability() {
  try {
    const apiUrl = `https://api.github.com/repos/${userName}/${repoName}`;
const headers = {
  Authorization: `Bearer ${token}`,
};

    const response = await axios.get(apiUrl, { headers });

    if (response.status === 200) {
      return true
    } else {
     return false
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false
    } else {
      console.error('Error:', error.message);
    }
  }
}


// 1. Function to search GitHub file
async function githubSearchFile(filePath, fileName) {
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}?ref=main`;
  const data = await githubApiRequest(url);
  return data.find((file) => file.name === fileName);
}

// 2. Function to create a new GitHub file
async function githubCreateNewFile(filePath, fileName, content) {
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
  const data = {
    message: `Create new file: ${fileName}`,
    content: Buffer.from(content).toString('base64'),
  };
  return await githubApiRequest(url, 'PUT', data);
}

// 3. Function to delete a GitHub file
async function githubDeleteFile(filePath, fileName) {
  const file = await githubSearchFile(filePath, fileName);
  if (!file) throw new Error('File not found on GitHub.');
  
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
  const data = {
    message: `Delete file: ${fileName}`,
    sha: file.sha,
  };
  await githubApiRequest(url, 'DELETE', data);
}

// 4. Function to get GitHub file content
async function githubGetFileContent(filePath, fileName) {
  const file = await githubSearchFile(filePath, fileName);
  if (!file) throw new Error('File not found on GitHub.');
  
  const url = file.download_url;
  const response = await fetch(url);
  return await response.text();
}

// 5. Function to clear GitHub file content and add new content
async function githubClearAndWriteFile(filePath, fileName, content) {
  const file = await githubSearchFile(filePath, fileName);
  if (!file) {
    await githubCreateNewFile(fileName, content);
  } else {
    const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
    const data = {
      message: `Modify file: ${fileName}`,
      content: Buffer.from(content).toString('base64'),
      sha: file.sha,
    };
    return await githubApiRequest(url, 'PUT', data);
  }
}

// 6. Function to delete an existing GitHub file and upload a new one
async function githubDeleteAndUploadFile(fileName, newContent) {
  await githubDeleteFile(fileName);
  await githubCreateNewFile(fileName, newContent);
}

//========================================
async function updateCMDStore(MsgID , CmdID) {
try { 
let olds = JSON.parse(await githubGetFileContent("Non-Btn",'data.json'))
olds.push({[MsgID]:CmdID})
var add = await githubClearAndWriteFile('Non-Btn','data.json',JSON.stringify(olds, null, 2))
return true
} catch (e) {
console.log( e)
return false
}
}

async function isbtnID(MsgID){
try{
let olds = JSON.parse(await githubGetFileContent("Non-Btn",'data.json'))
let foundData = null;
for (const item of olds) {
  if (item[MsgID]) {
    foundData = item[MsgID];
    break;
  }
}
if(foundData) return true
else return false
} catch(e){
return false
}
}

async function getCMDStore(MsgID) {
try { 
let olds = JSON.parse(await githubGetFileContent("Non-Btn",'data.json'))
let foundData = null;
for (const item of olds) {
  if (item[MsgID]) {
    foundData = item[MsgID];
    break;
  }
}
return foundData
} catch (e) {
console.log( e)
return false
}
} 

function getCmdForCmdId(CMD_ID_MAP, cmdId) {
  const result = CMD_ID_MAP.find((entry) => entry.cmdId === cmdId);
  return result ? result.cmd : null;
}

const connectdb = async () => {
let availabilityrepo = await checkRepoAvailability()
if(!availabilityrepo){
    const response = await axios.post(
      'https://api.github.com/user/repos',
      {
        name: repoName,
        private: true, // Set to true for a private repo
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
let get = {
LANG: 'EN' ,
ANTI_BAD: [],
MAX_SIZE: 100,
ONLY_GROUP: false,
ANTI_LINK: [],
ANTI_BOT: [],
ALIVE: `default`,
FOOTER: 'U M A R  M D',
LOGO: `https://i.imgur.com/9WgnDo0.jpeg` 
}
await githubCreateNewFile("settings", "settings.json",JSON.stringify(get))
console.log(`Database "${repoName}" created successfully 🛢️`);
}
else console.log("Database connected 🛢️")
};
//=====================================================================
async function input(setting, data){
let get = JSON.parse(await githubGetFileContent("settings", "settings.json"))
 
if (setting == "LANG") {
get.LANG = data
config.LANG = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ANTI_BAD") {
get.ANTI_BAD = data
config.ANTI_BAD = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "MAX_SIZE") {
get.MAX_SIZE = data
config.MAX_SIZE = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ONLY_GROUP") {
get.ONLY_GROUP = data
config.ONLY_GROUP = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ANTI_LINK") {
get.ANTI_LINK = data
config.ANTI_LINK = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ANTI_BOT") {
get.ANTI_BOT = data
config.ANTI_BOT = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ALIVE") {
get.ALIVE = data
config.ALIVE = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "FOOTER") {
get.FOOTER = data
config.FOOTER = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "LOGO") {
get.LOGO = data
config.LOGO = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} 

}

async function get(setting){
let get = JSON.parse(await githubGetFileContent("settings", "settings.json"))
 
if (setting == "LANG") {
return get.LANG
} else if (setting == "ANTI_BAD") {
return get.ANTI_BAD
} else if (setting == "MAX_SIZE") {
return get.MAX_SIZE
} else if (setting == "ONLY_GROUP") {
return get.ONLY_GROUP
} else if (setting == "ANTI_LINK") {
return get.ANTI_LINK
} else if (setting == "ANTI_BOT") {
return get.ANTI_BOT
} else if (setting == "ALIVE") {
return get.ALIVE
} else if (setting == "FOOTER") {
return get.FOOTER
} else if (setting == "LOGO") {
return get.LOGO
} 

}

async function updb(){
let get = JSON.parse(await githubGetFileContent("settings", "settings.json"))
 
config.LANG = get.LANG
config.MAX_SIZE = Number(get.MAX_SIZE)
config.ALIVE = get.ALIVE
config.FOOTER = get.FOOTER
config.LOGO = get.LOGO
config.ANTI_BAD = get.ANTI_BAD
config.ONLY_GROUP = get.ONLY_GROUP
config.ANTI_LINK = get.ANTI_LINK
config.ANTI_BOT = get.ANTI_BOT
console.log("Database writed ✅")
}

async function updfb(){
let get = {
LANG: 'EN' ,
ANTI_BAD: [],
MAX_SIZE: 100,
ONLY_GROUP: false,
ANTI_LINK: [],
ANTI_BOT: [],
ALIVE: `default`,
FOOTER: 'U M A R  M D',
LOGO: `https://i.imgur.com/9WgnDo0.jpeg` 
}
await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
config.LANG = 'EN'
config.MAX_SIZE = 100
config.ALIVE =`default`
config.FOOTER = 'U M A R  M D'
config.LOGO = `https://i.imgur.com/9WgnDo0.jpeg` 
config.ANTI_BAD = []
config.ONLY_GROUP = false
config.ANTI_LINK = []
config.ANTI_BOT = []
console.log("Database writed ✅")
}

module.exports = { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get,updb,updfb }
