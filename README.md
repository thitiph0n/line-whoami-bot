# LINE Whoami Bot

The LINE Whoami Bot is a simple LINE chatbot that responds to specific text triggers (whoami, my id, ไอดีของฉัน) by sending the user's LINE ID or source information back to them. This bot is built using the Hono framework and integrates with the LINE Messaging API.

## How It Works

1. When a user sends a message to the bot, the message is processed by the /webhook endpoint.
2. If the message matches one of the trigger texts (whoami, my id, ไอดีของฉัน), the bot retrieves the user's LINE ID or source information.
3. The bot sends a reply message containing the user's information

## Setup

### Prerequisites

- A LINE Developer account and a LINE Messaging API channel.
- Cloudflare Workers or another compatible runtime environment.

### Environment Variables

You need to set the following environment variable:

- LINE_MESSAGING_ACCESS_TOKEN: Your LINE Messaging API access token.

### Installation

1. Clone this repository:

```bash
git clone https://github.com/thitiph0n/line-whoami-bot.git
cd line-whoami-bot
```

2. Deploy the bot to your runtime environment (e.g., Cloudflare Workers):

```bash
yarn run deploy
```

3. Set up the LINE Messaging API webhook URL to point to your deployed bot's /webhook endpoint.

## Development

```bash
yarn install
yarn run dev
```
