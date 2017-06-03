import LoadbalanceContext from './LoadbalanceContext';
import LB from './Loadbalancer';
import LoadbalanceClient from './LoadbalanceClient';


export const defaults = {};

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
export const rule = {
    BEST_AVAILABLE_RULE: require("./rule/BestAvailableRule"),
    AVAILABILITY_FILTERING_RULE: require("./rule/AvailabilityFilteringRule"),
    RANDOM_RULE: require("./rule/RandomRule"),
    ROUND_ROBIN_RULE: require("./rule/RoundRobinRule"),
    WEIGHTED_RESPONSE_TIME_RULE: require("./rule/WeightedResponseTimeRule")
};

const context = new LoadbalanceContext();

export default class Loadbalancer {
    constructor(options) {
        const lb = new LB(context, options);
        this.client = new LoadbalanceClient(lb);
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