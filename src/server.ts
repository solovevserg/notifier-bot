import cors from "cors";
import express, { json } from "express";
import { ParseMode } from "telegraf/typings/telegram-types";
import { bot } from "./bot";
import { Message } from "./models.ts/message";
import { store } from "./store";

async function broadcast(message: string, parseMode: ParseMode = 'Markdown') {
    await Promise.all(store.chats.map(id =>
        bot.telegram.sendMessage(id, message, { parse_mode: parseMode })
            .catch((error) => console.log(`En error occured while sending notification to chat ${id}`, error))
    ));
}

const server = express();

server.use(json());
server.use(cors());

server.post<{}, unknown, Message>('/messages', async (req, res) => {
    if (req.body) {
        const { text, parseMode } = req.body;
        await broadcast(text, parseMode);
        console.log(`Message sent to ${store.size} users:`, text);
        res.sendStatus(200);
    } else {
        console.log(`Error while processing the request.`);
        res.sendStatus(400);
    }
});

export { server };