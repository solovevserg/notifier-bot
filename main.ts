import Telegraf from 'telegraf';
import express, { json } from 'express';
import cors from 'cors';


const users = new Set<number>();

const bot = new Telegraf('984030796:AAHDnjbKPTto0LFXu6t6Fwl-YmIkuhlsLr0');

console.log('starting')

bot.start(ctx => {
    if (ctx.chat) {
        users.add(ctx.chat.id);
        console.log('CHAT ID ADDED:', ctx.chat.id);
        bot.telegram.sendMessage(ctx.chat.id, 'You will get notifications');
    }
})

bot.command('users', ctx => {
    if (ctx.chat) {
        bot.telegram.sendMessage(ctx.chat.id, JSON.stringify(users));
    }
})

function broadcast(message: string) {
    users.forEach(id => {
        bot.telegram.sendMessage(id, message);
    })
}

bot.launch();

const app = express();
app.use(express.json())
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


app.listen(3010);
