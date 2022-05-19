const djsHelper = require('djs-helper');
const fetch = require('node-fetch');
const { Client } = require('discord.js');
/**
 * 
 * @param {Client} client - Your Bot Discord Client
 * @param {String} id - Bot ID
 * @param {String} api_token - Your API TOKEN [discord.bots.gg](https://discord.bots.gg/docs)
 * @param {Boolean} refresh - true if you want to refresh the stats every 30 mins
 * @param {Boolean} sanitized - If true, returns a sanitized version of the longDescription.
 */
async function postStats(client, api_token, id, refresh = false) {
    //Errors;
    if (typeof client != "object") throw new TypeError('pass a correct Discord.Client');
    if (!id || isNaN(id) || id.length != 18) throw new SyntaxError('pass a correct BOT ID');
    if (typeof refresh != "boolean") throw new TypeError('refresh must be a boolean');
    if (typeof api_token != "string") throw new TypeError('api_token must be a string');

    if (refresh) {
        setInterval(async () => await Post_This(client, api_token, id), 1800000)
    } else {
        await Post_This(client, api_token, id);
    }
};

async function getBot(id, sanitized = false) {
    //Errors;
    if (typeof sanitized != "boolean") throw new TypeError('sanitized must be a boolean');
    if (!id || isNaN(id) || id.length != 18) throw new SyntaxError('pass a correct BOT ID');
    try {
        let response = await (await fetch(`https://discord.bots.gg/api/v1/bots/${id}?sanitized=${sanitized}`)).json();
        return response;
    } catch (error) {
        if (error) console.error(error);
    }
};

async function getBots({ q = '', page = 0, limit = 50, authorId = '', authorName = '', unverified = false, lib = '', sort = '', order = 'asc' }) {
    try {
        let query = removeEmpty(`q=${q}&page=${page}&limit=${limit}&authorId=${authorId}&authorName=${authorName}&unverified=${unverified}&lib=${lib}&sort=${sort}&order=${order}`);
        let response = await (await fetch(`https://discord.bots.gg/api/v1/bots?${query}`)).json();
        return response;
    } catch (error) {
        if (error) console.error(error);
    }
};
//Utils;
function removeEmpty(string) {
    return string.replace(/([\?&])([^=]+=($|&))+/g, '$1').replace(/[\?&]$/g, '');
}
async function Post_This(client, api_token, id) {
    //Getting Bot Info Using discord.js & djs-helper;
    let guildCount = djsHelper.guildsCount(client);
    let shardCount = client.shard ? client.shard.count : 1 || 1;
    let shardId = 0;

    //Posting to discord.bots.gg;
    try {
        let response = await (await fetch(`https://discord.bots.gg/api/v1/bots/${id}/stats`,
            {
                method: 'post',
                body: JSON.stringify({ guildCount, shardCount, shardId }),
                headers: { 'Content-Type': 'application/json', 'Authorization': api_token }
            }
        )).json();
        let packageName = `[${require('../package.json').name} - v${require('../package.json').version}]`;
        if (response.shardCount && response.guildCount) {
            console.log(`${packageName} Stats Posted!`)
        } else {
            if (response.message) {
                console.log(`${packageName} Failed to post stats: ${response.message}`)
            }
        }
    } catch (error) {
        if (error) console.error(error)
    }
}
module.exports = { postStats, getBot, getBots };