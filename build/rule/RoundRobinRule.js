"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by feng on 2017/4/29.
 */
class RoundRobinRule {
    constructor(loadbalancer) {
        this.loadbalancer = loadbalancer;
        this.counter = 0;
    }

    choose(key) {
        let count = 0;
        let server = null;
        while (server === null && count++ < 10) {
            const reachableServers = this.loadbalancer.services;
            const allServers = this.loadbalancer.services;
            const upCount = reachableServers.length;
            const serverCount = allServers.length;

            if (upCount === 0 || serverCount === 0) {
                return null;
            }

            const nextServerIndex = this.incrementAndGetModulo(serverCount);
            console.log(nextServerIndex);
            server = allServers[nextServerIndex];

            if (server === null) {
                continue;
            }

            if (server.state.isAlive()) {
                return server;
            }

            // Next.
            server = null;
        }

        return server;
    }

    incrementAndGetModulo(modulo) {
        return this.counter = (this.counter + 1) % modulo;
    }
}
exports.default = RoundRobinRule;
module.exports = exports["default"];