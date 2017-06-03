import RoundRobinRule from './RoundRobinRule';

/**
 * Created by feng on 2017/4/29.
 */
export default class BestAvailableRule extends RoundRobinRule {
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