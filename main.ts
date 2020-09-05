import Telegraf from 'telegraf';
import express, { json } from 'express';
import cors from 'cors';

const PASSWORD = process.env.PASSWORD || 'admin123'
const TOKEN = process.env.TOKEN || process.argv[0];
const PORT = process.env.PORT || 3000;

if (!TOKEN) {
    throw new Error('No token provided.')
}

const users = new Set<number>();
const bot = new Telegraf(TOKEN);

bot.start(ctx => {
    if (ctx.chat) {
        bot.telegram.sendMessage(ctx.chat.id, 'Hello! Enter the password to start getting notifications.');
    }
})

bot.hears(PASSWORD, ctx => {
    if (ctx.chat) {
        users.add(ctx.chat.id);
        bot.telegram.sendMessage(ctx.chat.id, 'You will be getting notifications.');
    }
})

bot.command('users', ctx => {
    if (ctx.chat) {
        bot.telegram.sendMessage(ctx.chat.id, JSON.stringify([...users]));
    }
})

function broadcast(message: string) {
    users.forEach(id => {
        bot.telegram.sendMessage(id, message);
    })
}

console.log('Starting the bot...');
bot.launch();

console.log('Bot started and is waiting for new messages.');

const app = express();
app.use(json())
app.use(cors())

app.post('/broadcast', function (req, res) {
    const message = req.param('message') || req.body && req.body.message as string;
    if (message) {
        broadcast(message);
        console.log('MESSAGE SENT:', message);
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
})

app.listen(PORT);
console.log(`Express server is started at port ${PORT} and is ready for broadcasting.`);
