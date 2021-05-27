# discordbotsgg.api
This package makes it easy for you to use the [discord.bots.gg](https://discord.bots.gg/) API, Contains automatic posting stats of (Guilds count, Shards count, Shard id).

## Installation


```bash
npm i discordbotsgg.api
```

## Usage

```js

const DSC = require('discordbotsgg.api');
const dscbots = new DSC("YOUR_TOKEN_HERE", client);



//Automatic post stats (guildCount, shardCount, shardId)
dscbots.on('statsPosted', () => {
    console.log('[discordbots.api] posted!');
  })

//Get Bot with ID

dscbots.getBot("BOT_ID").then(results => {

console.log(results);

/* results output:

{ Bot }

*/


});

//Get Bots

let options = {

   page: 0,
   limit: 1,
   order: 'ASC'

} //More options here: https://discord.bots.gg/docs/endpoints#get_bots

dscbots.getBots(options).then(results => {

console.log(results);

/*results output:

{
  "count": 1000, // total number of matching bots
  "limit": 50, // the max number of bots to retrieve
  "page": 0, // the current page
  "bots": [
    // Uses the Bot structure
    { Bot }, { Bot }, { Bot }, etc...
  ]
}

*/

});

```



## Discord Bots: 
##### [DOCS](https://discord.bots.gg/docs) | [SITE](https://discord.bots.gg/)

### Developer: `Amir.#0001`