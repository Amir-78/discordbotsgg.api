# discordbotsgg.api
This package makes it easy for you to use the [discord.bots.gg](https://discord.bots.gg/) API
## Installation
<div align="center">
    <a href="https://www.npmjs.com/package/discordbots.api"><img src="https://img.shields.io/npm/v/discordbots.api.svg?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/discordbots.api"><img src="https://img.shields.io/npm/dt/discordbots.api.svg?maxAge=3600" alt="npm downloads" /></a>
</div>

- Download [Node.js](https://nodejs.org)
- Write in CMD / Terminal:
```bash
npm i discordbots.api
```
## Example Code:

```javascript
const dbAPI = require('discordbots.api');
const { Client, Intents, } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS,]
});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    //PostStats;
    await dbAPI.postStats(client, "API_TOKEN", "BOT_ID", false);

});

client.login("TOKEN");
```

## Documentation
### Functions:

 **Name**      | **Params**            | **Type**           | **Function**           | **Returns**                                                                                                 
---------------|-----------------------|--------------------|------------------------|------------------------------------------------------------------------------------
 await postStats()     | `client`,`api_token`,`botID`,`refresh`             | `Object (Discord.Client)`,`String`,`String`,`Boolean`           | `Posts your Bot Stats automatically, if refresh is` true `it will update your bot stats every 30 mins`  | `/`                                                                    
 await getBot() | `botID`,`sanitized`   | `String`,`Boolean` | `Get a bot using ID`| `Object ({ Bot })`
 await getBots()    | [Query Params](https://discord.bots.gg/docs/endpoints#get_bots)            | [Query Params Types](https://discord.bots.gg/docs/endpoints#get_bots)           | `Search for bots using Query Parameters`| `Object`                                                                                         

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
