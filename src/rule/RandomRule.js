import Random from 'random-js';

/**
 * Created by feng on 2017/4/29.
 */
export default class RandomRule {
    constructor(loadbalancer) {
        this.randomEngine = new Random();
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

            const index = this.randomEngine.integer(0, serverCount - 1);
            server = reachableServers[index];

            if (server === null) {
                continue;
            }

            if (server.state.isAlive()) {
                return server;
            }

            server = null;
        }

        return server;
    }
}