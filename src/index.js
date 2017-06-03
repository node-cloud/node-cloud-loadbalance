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
    BestAvailableRule: require("./rule/BestAvailableRule"),
    AvailabilityFilteringRule: require("./rule/AvailabilityFilteringRule"),
    RandomRule: require("./rule/RandomRule"),
    RoundRobinRule: require("./rule/RoundRobinRule"),
    WeightedResponseTimeRule: require("./rule/WeightedResponseTimeRule")
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