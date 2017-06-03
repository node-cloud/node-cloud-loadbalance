"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by feng on 2017/4/29.
 */
class AvailabilityFilteringRule {
    constructor(loadbalancer) {
        this.loadbalancer = loadbalancer;
    }

    choose(key) {}
}
exports.default = AvailabilityFilteringRule;