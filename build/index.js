'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.rule = exports.defaults = undefined;

var _LoadbalanceContext = require('./LoadbalanceContext');

var _LoadbalanceContext2 = _interopRequireDefault(_LoadbalanceContext);

var _Loadbalancer = require('./Loadbalancer');

var _Loadbalancer2 = _interopRequireDefault(_Loadbalancer);

var _LoadbalanceClient = require('./LoadbalanceClient');

var _LoadbalanceClient2 = _interopRequireDefault(_LoadbalanceClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaults = exports.defaults = {};

/**
 *
 * @type {{
 *      BestAvailableRule,
 *      AvailabilityFilteringRule,
 *      RandomRule,
 *      RoundRobinRule,
 *      WeightedResponseTimeRule
 * }}
 */
const rule = exports.rule = {
    BEST_AVAILABLE_RULE: require("./rule/BestAvailableRule"),
    AVAILABILITY_FILTERING_RULE: require("./rule/AvailabilityFilteringRule"),
    RANDOM_RULE: require("./rule/RandomRule"),
    ROUND_ROBIN_RULE: require("./rule/RoundRobinRule"),
    WEIGHTED_RESPONSE_TIME_RULE: require("./rule/WeightedResponseTimeRule")
};

const context = new _LoadbalanceContext2.default();

class Loadbalancer {
    constructor(options) {
        const lb = new _Loadbalancer2.default(context, options);
        this.client = new _LoadbalanceClient2.default(lb);
        this.context = context;
    }

    addService(service) {
        return this.client.addService(service);
    }

    removeService(serviceId) {
        return this.client.removeService(serviceId);
    }

    choose() {
        return this.client.choose();
    }

    execute(request, options) {
        return this.client.executeWithLoadBalance(request, options);
    }
}
exports.default = Loadbalancer;