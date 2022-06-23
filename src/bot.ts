import Telegraf from "telegraf";
import { TOKEN, PASSWORD } from "./environment";
import { store } from './store';

if (!TOKEN) {
    throw new Error('No token provided.');
}

if (!PASSWORD) {
    throw new Error('You have not provided password. It\'s not safety and can lead to data leaks. Please provide password and restart.');
}

export const bot = new Telegraf(TOKEN);

bot.start(async ({ chat }) => {
    if (chat && !store.has(chat.id)) {
        await bot.telegram.sendMessage(chat.id, 'Hello! Enter the password to start getting notifications.');
        console.log(`Chat ${chat.id}: called /start.`);
    }
})

bot.hears(PASSWORD, async ({ chat }) => {
    if (chat && !store.has(chat.id)) {
        store.add(chat.id);
        await bot.telegram.sendMessage(chat.id, 'You will be getting notifications.');
        console.log(`Chat ${chat.id}: successfully entered password.`);
    }
})

bot.command('chats', async ({ chat }) => {
    if (chat && store.has(chat.id)) {
        const chats = store.chats;
        await bot.telegram.sendMessage(chat.id, JSON.stringify(chats));
        console.log(`Chat ${chat.id}: called /chats.`);
    }
})

bot.command('stop', async ({ chat }) => {
    if (chat && store.has(chat.id)) {
        store.delete(chat.id);
        await bot.telegram.sendMessage(chat.id, 'You will not be getting notifications more. Enter start to undo.');
        console.log(`Chat ${chat.id}: called /stop. Chat was sucessfully removed`);
    }
})
