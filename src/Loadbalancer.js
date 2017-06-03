import util from 'lodash';

import ZoneStats from './stats/ZoneStats';
import ServerStats from './stats/ServerStats';

export default class Loadbalancer {
    /**
     * New a loadbalancer.
     *
     * @param context          {object}   @see {LoadbalanceContext}
     * @param options          {object}   The configuration of this loadbalancer.
     * @param options.id       {string}   The id of this loadbalancer.
     * @param options.name     {string}   The name of this loadbalancer.
     * @param options.services {Array}    List of the service, the detail of service @see {Loadbalancer#addService}.
     * @param options.rule     {function} The rule of this loadbalancer, default is @see {RandomRule}.
     */
    constructor(context, options = {}) {
        this.context = context;
        this.init(options);
    }

    init(options) {
        this.id = options.id;
        this.name = options.name || this.id;
        this.services = [];
        this.Rule = require("./rule/RandomRule");
        if (util.isArray(options.services)) {
            this.services = initialServices(options.services);
        }
        if (util.isFunction(options.rule)) {
            this.Rule = options.rule;
        }

        this.rule = new this.Rule(this);
    }

    /**
     * Add service.
     *
     * @param service         {object}
     * @param service.id      {string}
     * @param service.zone    {string}
     * @param service.name    {string}
     * @param service.address {string}
     * @param service.port    {integer}
     * @param service.zone    {string}
     */
    addService(service) {
        if (service = initialService(service)) {
            this.services.push(service);
        }
    }

    removeService(serviceId) {
        let serviceCount = this.services.length;
        this.services = this.services.filter(service => service.id === serviceId);

        return serviceCount - this.services.length;
    }

    /**
     * Return a service instance.
     *
     * @return {object} @see {Loadbalancer#addService}
     */
    chooseService() {
        if (!this.rule) {
            throw new Error("The rule is not exist.");
        }

        return this.rule.choose();
    }
}

function initialServices(services) {
    return services.map(service => initialService(service)).filter(service => service);
}

function initialService(service) {
    if (!service.address || !service.port) {
        return null;
    }

    service.id = service.id || (service.address + ':' + service.port);
    service.name = service.name || service.id;
    service.zone = service.zone || 'default';
    service.state = new ServerStats();
    // this.context.loadbalanceStat.zoneMap[service.zone] = service.zone;
    // this.context.loadbalanceStat.zoneStatsMap[service.zone] = new ZoneStats(service.zone);
    return service;
}