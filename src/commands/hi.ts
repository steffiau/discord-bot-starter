import { Message } from "discord.js";
import { getRandomMsg } from "../util";

export const command = {
  name: "hi",
  description: "",
  execute(message: Message, args: string[]) {
    const messages = [
      "I fart in your general direction.",
      "Your Mother was A Hamster and you Father Smelled of elder berries.",
    ];
    message.channel.send(getRandomMsg(messages));
  },
};
