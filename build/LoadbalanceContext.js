'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _SimpleCache = require('./SimpleCache');

var _SimpleCache2 = _interopRequireDefault(_SimpleCache);

var _LoadbalanceStats = require('./stats/LoadbalanceStats');

var _LoadbalanceStats2 = _interopRequireDefault(_LoadbalanceStats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LoadbalanceContext {
    constructor() {
        this.loadbalancerCache = new _SimpleCache2.default();
        this.loadbalanceClientCahce = new _SimpleCache2.default();
        this.loadbalanceStat = new _LoadbalanceStats2.default();
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
exports.default = LoadbalanceContext;