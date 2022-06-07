import { bot } from './bot';
import { server } from './server';
import { PORT } from './environment';

bot.launch().then(() => {
    console.log(`Bot started and is waiting for new users.`);
});

server.listen(PORT, () => {
    console.log(`Express server is started at port ${PORT} and is ready for broadcasting.`);
});
