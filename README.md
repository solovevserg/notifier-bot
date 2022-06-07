# Notifier Bot

Bot for broadcasting messages to Telegram groups and users via HTTP-requests. It has simple auth mechanism with a password.

## Get started

User Docker image

```bash
# To run
docker run sdallaboratory/notifier-bot -e TOKEN=<your_telegram_token> -e PASSWORD=<your_password> -p 8080:3000
# To test
curl -X POST http://localhost:8080/messages -H 'Content-Type: application/json' -d '{"text":"*Hello* :)","parseMode":"MarkdownV2"}'
```

## Development

Clone repo and run commands

```bash
yarn install --frozen-lockfile
yarn dev <your_token> <your_password>
```
