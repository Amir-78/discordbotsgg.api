const EventEmitter = require('events');
const fetch = require('node-fetch');
const querystring = require('querystring');

let API_URL = "https://discord.bots.gg/api/v1";

const getLib = (libr, client) => {
    try {

        const library = require.cache[require.resolve(libr)];

        return library && client instanceof library.exports.Client;

    } catch (err) {

        return false;

    }
};

const isDjsOrEris = client => getLib('discord.js', client) || getLib('eris', client);

class DISBOTSAPI extends EventEmitter {

    constructor(token, client) {
        super();
        this.token = token;
        this.client = client

        /**
         * Event when success posting Bot Stats
         * @event statsPosted
         */

        if (this.client && isDjsOrEris(this.client)) {


            this.client.on('ready', () => {


                this.statsPoster()

                    .then(() => this.emit('statsPosted'))


                setInterval(() => {

                    this.statsPoster()

                        .then(() => this.emit('statsPosted'))


                }, 900000);

            });

        } else if (this.client) {
            console.error(`[discordbots.api poster] The provided client not supported.`);
        }

    }

    //Api Req

    reqAPI(method, endpoint, data) {
        return new Promise((resolve, reject) => {

            if (method === "get") {

                this.data = data;

                let Dfdata = {

                    page: 0,
                    limit: 1,
                    order: 'ASC'

                }

                let Dfdata2 = {

                    sanitized: false

                }


                if (endpoint === "bots") {

                    if (!data) {

                        this.data = Dfdata;

                    }

                } else if (endpoint.startsWith("bots/")) {

                    if (!data) {

                        this.data = Dfdata2;

                    } else if (!data.sanitized) {

                        this.data = Dfdata2;


                    }


                }


                fetch(`${API_URL}/${endpoint}?${querystring.encode(this.data)}`, { method: `${method}` }).then(res => {

                    if (res.ok) {

                        resolve(res.json())

                    } else {

                        reject(res.statusText)

                    }

                });

            } else if (method === "post") {

                if (!this.token) {

                    console.error(`[discordbots.api] Required Authentication!`);

                    return;

                }


                if (!data.shardCount && !data.shardId) {


                    this.data = {

                        guildCount: data.guildCount,
                        shardCount: 1,
                        shardId: 0

                    }

                }else{
					
					this.data = data;
					
				}


                fetch(`${API_URL}/${endpoint}`, { method: `${method}`, headers: { 'Content-Type': 'application/json', 'Authorization': this.token }, body: JSON.stringify(this.data) }).then(res => {


                    if (res.ok) {

                        resolve(res.json())

                    } else {

                        reject(res.statusText)

                    }

                });

            }

        });

    }


    // Functions


    async statsPoster() {
        const data = {};


        data.guildCount = this.client.guilds.size || this.client.guilds.cache.size;

        if (this.client.shard && this.client.shard.count) {

            if (this.client.shard.ids && this.client.shard.ids.length === 1 && this.client.shard.count > 1) {

                data.shardId = this.client.shard.ids[0];

            } else {

                data.shardId = this.client.shard.id;

            }
            data.shardCount = this.client.shard.count;

        } else if (this.client.shards && this.client.shards.size !== 1) {

            data.shardCount = this.client.shards.size;

        }

        this.reqAPI("post", `bots/${this.client.user.id}/stats`, data);

    }// end poster


    getBots(data) {


        let res = this.reqAPI("get", `bots`, data);

        return res;

    }// end get bots

    getBot(id, data) {


        let res = this.reqAPI("get", `bots/${id}`, data);

        return res;

    }// end get bot 

};


module.exports = DISBOTSAPI;
