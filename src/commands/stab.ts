import { Message } from "discord.js";

export const command = {
  name: "stab",
  description: "stab someone",
  execute(message: Message, args: string[]) {
    if (!message.mentions.users.size) {
      return message.reply("you need to tag a user in order to stab them!");
    }
    const taggedUser = message.mentions.users.first();
    message.channel.send(`You've stabbed ${taggedUser?.username}.`);
  },
};
