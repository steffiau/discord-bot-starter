import { Message } from "discord.js";

export const command = {
  name: "server",
  description: "Shows server name and number of members",
  execute(message: Message, args: string[]) {
    message.channel.send(
      `Server:${message.guild?.name} Number of members: ${message.guild?.memberCount}`
    );
  },
};
