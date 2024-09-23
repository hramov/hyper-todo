import * as TelegramBot from 'node-telegram-bot-api';
import { envConfig } from '../config/env.config';

export function initTelegramService() {
  const bot = new TelegramBot(envConfig.BOT_TOKEN, { polling: true });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const body = msg.text;

    if (body === '/start') {
      bot.sendMessage(chatId, 'Welcome');
    }
  });

  return bot;
}
