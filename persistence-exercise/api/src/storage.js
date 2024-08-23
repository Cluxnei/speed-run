import {InMemoryStorageDriver} from "./drivers/memory.js";

export class Storage {

    constructor(
        driver
    ) {
        this.driver = driver ?? new InMemoryStorageDriver();
    }

    async get(key) {
        return this.driver.get(key);
    }

    async set(key, value) {
        return this.driver.set(key, value);
    }

    async del(key) {
        return this.driver.del(key);
    }

}