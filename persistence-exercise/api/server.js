import express from 'express';
import {InMemoryStorageDriver} from "./src/drivers/memory.js";
import {Storage} from './src/storage.js'
import {FileSystemStorageDriver} from "./src/drivers/filesystem.js";


const app = express();
app.use(express.json());

const availableDrivers = [InMemoryStorageDriver, FileSystemStorageDriver];
const storages = {};

for (const driver of availableDrivers) {
    storages[String(driver)](new Storage(new driver()));
}

function selectStorage(storage) {
    return storages[String(storage)] ?? null;
}

app.get('/drivers', (_, res) => {
    return res.json(availableDrivers.map(String));
})

app.get('/:key', (req) => {
    const storage = selectStorage(req.query.storage);
    if (!storage) {
        throw new Error(`Storage not found: ${req.query.storage}`);
    }
    return storage.get(req.params.key);
});

app.post('/:key', (req) => {
    const storage = selectStorage(req.query.storage);
    if (!storage) {
        throw new Error(`Storage not found: ${req.query.storage}`);
    }
    return storage.set(req.params.key, req.body.value);
});

app.put('/:key', (req) => {
    const storage = selectStorage(req.query.storage);
    if (!storage) {
        throw new Error(`Storage not found: ${req.query.storage}`);
    }
    return storage.set(req.params.key, req.body.value);
});

app.delete('/:key', (req) => {
    const storage = selectStorage(req.query.storage);
    if (!storage) {
        throw new Error(`Storage not found: ${req.query.storage}`);
    }
    return storage.del(req.params.key);
});

