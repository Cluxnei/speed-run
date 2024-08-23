export class InMemoryStorageDriver {

    constructor() {
        this.storage = {};
    }

    async get(key) {
        return this.storage[key];
    }

    async set(key, value) {
        this.storage[key] = value;
    }

    async del(key) {
        delete this.storage[key];
    }

}