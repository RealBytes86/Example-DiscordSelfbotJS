const { Client, Message } = require("discord.js-selfbot-v13");
const configs = require("../Configs/configs");
const { commandInfo } = require("../Utils/Logger");

module.exports = {
    once: false,
    /**
     * @param {Message} ctx 
     * @param {Client} client 
     */
    async execute(ctx, client) {
        let content = ctx.content;

        if(ctx.author.id == client.user.id) return;

        if(content.startsWith(configs.prefix)) {
            ctx.cancel = true;
            const args = content.slice(configs.prefix.length).trim().split(/ +/g);
            const commandName = args.shift().toLowerCase();

            if(commandName.length == 0) {
                commandInfo("None not found.");
                return;
            }

            const command = client.commands.get(commandName);

            if(!command) {
                commandInfo(commandName + " not found.")
                return;
            }

            await command.execute(ctx, args, client);
        }
    }
}
