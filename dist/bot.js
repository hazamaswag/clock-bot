"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const discord_js_1 = require("discord.js");
const jikants_1 = __importDefault(require("jikants"));
const client = new discord_js_1.Client();
const PREFIX = "!";
client.on("ready", () => {
    var _a;
    console.log(`${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag} has logged in`);
});
client.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot)
        return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        if (CMD_NAME === "try" && args.length) {
            const title = yield jikants_1.default.Anime.byId(+args[0])
                .then((b) => ({
                eng_title: b === null || b === void 0 ? void 0 : b.title,
                nihongo_title: b === null || b === void 0 ? void 0 : b.title_japanese,
            }))
                .catch((error) => console.log(error));
            const scores = yield jikants_1.default.Anime.stats(+args[0])
                .then((b) => b === null || b === void 0 ? void 0 : b.scores)
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
                yield message.channel
                    .send(`${title.eng_title}\nJapanese: ${title.nihongo_title}\nScore: ${finalScore}`)
                    .catch((error) => message.channel.send(error + " fail"));
            }
            else {
                yield message.channel
                    .send(`not in base`)
                    .catch((error) => message.channel.send(error + " fail"));
            }
        }
    }
}));
client.login(process.env.SUGOI_BOT_TOKEN);
//# sourceMappingURL=bot.js.map