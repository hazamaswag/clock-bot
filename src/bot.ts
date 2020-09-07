require("dotenv").config();
import { Client } from "discord.js";
import JikanTS from "jikants";

const client = new Client();
const PREFIX = "!";

client.on("ready", () => {
  console.log(`${client.user?.tag} has logged in`);
});

type Title = void | TitleObj;

interface TitleObj {
  eng_title: string | undefined;
  nihongo_title: string | undefined;
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (CMD_NAME === "try" && args.length) {
      const title: Title = await JikanTS.Anime.byId(+args[0])
        .then((b) => ({
          eng_title: b?.title,
          nihongo_title: b?.title_japanese,
        }))
        .catch((error) => console.log(error));

      const scores = await JikanTS.Anime.stats(+args[0])
        .then((b) => b?.scores)
        .catch((error) => console.log(error));
      console.log(title.nihongo_title, scores);

      if (scores != undefined) {
        let finalScore = 0;
        for (let s in scores) {
          const vote = s;
          const percentage = scores[s].percentage / 100;
          finalScore += +vote * percentage;
          console.log(finalScore);
        }
        await message.channel
          .send(
            `${title.eng_title}\nJapanese: ${title.nihongo_title}\nScore: ${finalScore}`
          )
          .catch((error) => message.channel.send(error + " fail"));
      } else {
        // console.log(scores![1]);

        await message.channel
          .send(`not in base`)
          .catch((error) => message.channel.send(error + " fail"));
      }
    }
  }
});

client.login(process.env.SUGOI_BOT_TOKEN);
