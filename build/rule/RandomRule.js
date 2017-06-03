'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _randomJs = require('random-js');

var _randomJs2 = _interopRequireDefault(_randomJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by feng on 2017/4/29.
 */
class RandomRule {
    constructor(loadbalancer) {
        this.randomEngine = new _randomJs2.default();
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
exports.default = RandomRule;
module.exports = exports['default'];