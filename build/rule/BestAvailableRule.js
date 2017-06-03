'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _RoundRobinRule = require('./RoundRobinRule');

var _RoundRobinRule2 = _interopRequireDefault(_RoundRobinRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by feng on 2017/4/29.
 */
class BestAvailableRule extends _RoundRobinRule2.default {
    constructor(loadbalancer) {
        super(loadbalancer);
    }

    choose(key) {
        const serverList = this.loadbalancer.services;
        let minimalConcurrentConnections = Number.MAX_VALUE;
        const currentTime = new Date().getTime();
        let chosen = null;

        serverList.forEach(server => {
            let serverStats = server.stats;

            if (!serverStats.isCircuitBreakerTripped(currentTime)) {
                const concurrentConnections = serverStats.getActiveRequestsCount(currentTime);
                if (concurrentConnections < minimalConcurrentConnections) {
                    minimalConcurrentConnections = concurrentConnections;
                    chosen = server;
                }
            }
        });

        if (chosen === null) {
            return super.choose(key);
        } else {
            return chosen;
        }
    }
}
exports.default = BestAvailableRule;