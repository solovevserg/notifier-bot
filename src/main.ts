import Telegraf from 'telegraf';
import express, { json } from 'express';
import cors from 'cors';
import { ParseMode } from 'telegraf/typings/telegram-types';
import { Message } from './models.ts/message';

const TOKEN = process.env.TOKEN || process.argv[2];
const PASSWORD = process.env.PASSWORD || process.argv[3]
const PORT = process.env.PORT || 3000;

if (!TOKEN) {
    throw new Error('No token provided.');
}

if (!PASSWORD) {
    throw new Error('You have not provided password. It\'s not safety and can lead to data leaks. Please provide password and restart.');
}

const users = new Set<number>();
const bot = new Telegraf(TOKEN);

bot.start(async ({ chat }) => {
    if (chat) {
        await bot.telegram.sendMessage(chat.id, 'Hello! Enter the password to start getting notifications.');
        console.log(`CHAT ${chat.id}: called /start.`);
    }
})

bot.hears(PASSWORD, async ({ chat }) => {
    if (chat) {
        users.add(chat.id);
        await bot.telegram.sendMessage(chat.id, 'You will be getting notifications.');
        console.log(`CHAT ${chat.id}: successfully entered password.`);
    }
})

bot.command('users', async ({ chat }) => {
    if (chat && users.has(chat.id)) {
        await bot.telegram.sendMessage(chat.id, JSON.stringify([...users]));
        console.log(`CHAT ${chat.id}: called /users.`);
    }
})

async function broadcast(message: string, parseMode: ParseMode = 'Markdown') {
    await Promise.all([...users].map(id => {
        bot.telegram.sendMessage(id, message, { parse_mode: parseMode });
    }))
}

console.log('Starting the bot...');
bot.launch().then(() => {
    console.log(`Bot started and is waiting for new messages.`);
});

const app = express();
app.use(json());
app.use(cors());

app.post<string, any, Message, Message | undefined, { message: string }>('/messages', async (req, res) => {
    if (req.body) {
        const { text, parseMode } = req.body;
        broadcast(text, parseMode);
        console.log(`MESSAGE SENT TO ${users.size} USERS:`, text);
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
})

app.listen(PORT, () => {
    console.log(`Express server is started at port ${PORT} and is ready for broadcasting.`);
});
