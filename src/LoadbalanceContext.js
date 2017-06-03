import SimpleCache from './SimpleCache';
import LoadbalanceStats from './stats/LoadbalanceStats';

export default class LoadbalanceContext {
    constructor() {
        this.loadbalancerCache = new SimpleCache();
        this.loadbalanceClientCahce = new SimpleCache();
        this.loadbalanceStat = new LoadbalanceStats();
    }

    addLoadbalancer(id, loadbalancer) {
        this.loadbalancerCache.set(id, loadbalancer);
    }

    getLoadbalancer(id) {
        return this.loadbalancerCache.get(id);
    }

    addLoadbalanceClient(id, client) {
        this.loadbalanceClientCahce.set(id, client);
    }

    getLoadbalanceClient(id) {
        return this.loadbalanceClientCahce.get(id);
    }
}