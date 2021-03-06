export default class SimpleCache {
    constructor() {
        this.cache = new Map();
    }

    get(key) {
        return this.cache.get(key);
    }

    set(key, value) {
        return this.cache.set(key, value);
    }

    getAll() {
        return this.cache.getAll();
    }

    size() {
        return this.cache.size;
    }

    remove(key) {
        return this.cache.delete(key);
    }

    clear() {
        return this.cache.clear();
    }
}