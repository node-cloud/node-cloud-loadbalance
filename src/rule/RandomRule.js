import random from 'random-js';

/**
 * Created by feng on 2017/4/29.
 */
export default class RandomRule {
    constructor(loadbalancer) {
        this.loadbalancer = loadbalancer;
    }

    choose(key) {
        let server = null;

        while (server === null) {
            const reachableServers = this.loadbalancer.services;
            const allServers = this.loadbalancer.services;
            const upCount = reachableServers.length;
            const serverCount = allServers.length;

            if (upCount === 0 || serverCount === 0) {
                return null;
            }

            const index = random.integer(0, serverCount);
            server = reachableServers[index];

            if (server === null) {
                continue;
            }

            if (server.isAlive()) {
                return server;
            }

            server = null;
        }

        return server;
    }
}