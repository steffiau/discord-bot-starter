import { Message } from "discord.js";

export const command = {
  name: "args-info",
  description: "test arguments",
  execute(message: Message, args: string[]) {
    message.channel.send(`Command name: args-info\nArguments: ${args}`);
  },
};
