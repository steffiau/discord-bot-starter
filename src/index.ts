// https://discordjs.guide/
import { Client as DiscordClient } from "discord.js";
import { config as DotenvConfig } from "dotenv";

import { prefix } from "./bot-config";
import { getRandomMsg } from "./util";

DotenvConfig();
const client = new DiscordClient();
client.once("ready", () => {
  console.log(`logged in as ${client.user?.tag}`);
  client.user?.setPresence({
    activity: { name: "bot starter", type: "PLAYING" },
    status: "online",
  });
});

client.on("message", (message) => {
  if (message.content === prefix) {
    const messages = [
      "I fart in your general direction.",
      "Your Mother was A Hamster and you Father Smelled of elder berries.",
    ];
    message.channel.send(getRandomMsg(messages));
  } else if (message.content === `${prefix}server`) {
    message.channel.send(
      `Server:${message.guild?.name} Number of members: ${message.guild?.memberCount}`
    );
  } else if (message.content.startsWith(`${prefix}stab`)) {
    const taggedUser = message.mentions.users.first();
    message.channel.send(`You've stabbed ${taggedUser?.username}.`);
  } else if (message.content.startsWith(prefix)) {
    message.channel.send("Beep bop. I don't understand your command human.");
  }
});

client.login(process.env.TOKEN);
