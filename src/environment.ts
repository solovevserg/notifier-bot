export const TOKEN = process.env.BOT_TOKEN || process.argv[2];
export const PASSWORD = process.env.BOT_PASSWORD || process.argv[3]
export const PORT = process.env.BOT_PORT || 3000;
export const STORE_PATH = '.data/chats.json'