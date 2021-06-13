// https://discordjs.guide/
import { Client as DiscordClient, Collection, Message } from "discord.js";
import { config as DotenvConfig } from "dotenv";
import fs from "fs";
import path from "path";

import { prefix } from "./bot-config";

interface Command {
  name: string;
  description: string;
  execute: (message: Message, args: string[]) => void;
}

DotenvConfig();
const client = new DiscordClient();
const clientCommands = new Collection<string, Command>();

const loadCommands = async () => {
  const commandFiles = fs
    .readdirSync(path.resolve(__dirname, "./commands"))
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const { command } = await import(`./commands/${file}`);
    clientCommands.set(command.name, command);
  }
};
loadCommands();

client.once("ready", () => {
  console.log(`logged in as ${client.user?.tag}`);
  client.user?.setPresence({
    activity: { name: "bot starter", type: "PLAYING" },
    status: "online",
  });
});

client.on("message", (message: Message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  if (!command || !clientCommands.has(command)) {
    message.channel.send("Beep bop. I don't understand your command human.");
    return;
  }

  try {
    const commandObj = clientCommands.get(command);
    if (!commandObj) return;
    commandObj.execute(message, args);
  } catch (err) {
    console.log(err);
  }
});

client.login(process.env.TOKEN);
