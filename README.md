# Notifier Bot

Bot for broadcasting messages to Telegram groups and users via HTTP-requests. It has simple auth mechanism with a password.

## Get started

### How to run bot

Use Docker image

```bash
# To run
docker run sdallaboratory/notifier-bot \
    -e TOKEN=<your_telegram_token> \
    -e PASSWORD=<your_password> \
    -v <your_json_path>:.data.json \
    -p 8080:3000

# To test
curl -X POST http://localhost:8080/messages \
    -H 'Content-Type: application/json' \
    -d '{"text":"*Hello* :)","parseMode":"MarkdownV2"}'
```

### How to broadcast a message

Just send `POST` request to `/messages` with body like this

```json
// Simple text
{ "text": "Hello" }

// Markdown markup
{
    "text": "[My webpage](https://sergsol.com/)",
    "parseMode": "MarkdownV2" 
}
```

### How to start getting messages

1. Go to chat with your bot (or add him into a group)
2. Press `Start`
3. Enter your password as bot asked
4. You are ready 👌 Send a test message to ensure it works

## Development

Clone repo and run commands

```bash
yarn install --frozen-lockfile
yarn dev <your_token> <your_password> <express_port>
```
