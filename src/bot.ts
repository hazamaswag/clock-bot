require("dotenv").config();
import { Client } from "discord.js";

const client = new Client();
const PREFIX = "!";

client.on("ready", () => {
  console.log(`${client.user?.tag} has logged in`);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === "drive" && !args.length) {
      await message.channel
        .send("to change")
        .catch((error) => message.channel.send(error));
    }
  }
});

client.login(process.env.CLOCK_BOT_TOKEN);
