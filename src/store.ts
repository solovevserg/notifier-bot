import { STORE_PATH } from './environment';
import JSONdb from 'simple-json-db';

class ChatStore {

    private readonly store = new JSONdb(STORE_PATH);

    add(id: number) {
        return this.store.set(String(id), true);
    }

    get chats() {
        return Object.keys(this.store.JSON()).map(Number);
    }

    has(id: number) {
        return this.store.has(String(id));
    }

    delete(id: number) {
        return this.store.delete(String(id));
    }

    [Symbol.iterator]() {
        return this.chats[Symbol.iterator]();
    }

    get size() {
        return this.chats.length;
    } 

}

export const store = new ChatStore();