import { ParseMode } from "telegraf/typings/telegram-types";

export interface Message {
    text: string;
    parseMode?: ParseMode; 
}