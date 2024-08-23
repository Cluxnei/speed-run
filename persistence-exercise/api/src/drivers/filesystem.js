import {readFileSync, writeFileSync} from 'fs';

export class FileSystemStorageDriver {

    constructor() {
        this.storagePath = 'storage/storage.json';
        this.refresh();
    }

    async get(key) {
        this.refresh();
        return this.storage[key];
    }

    async set(key, value) {
        this.refresh();
        this.storage[key] = value;
        this.save();
    }

    async del(key) {
        this.refresh();
        delete this.storage[key];
        this.save();
    }

    save() {
        writeFileSync(this.storagePath, JSON.stringify(this.storage));
    }

    sink() {
        const content = readFileSync(this.storagePath, {
            encoding: 'utf8'
        });
        let parsed = {};
        if (content && typeof content !== 'string') {
            try {
                parsed = JSON.parse(content);
            } catch {
                // silence is golden
            }
        }
        return parsed;
    }

    refresh() {
        this.storage = this.sink();
    }

}