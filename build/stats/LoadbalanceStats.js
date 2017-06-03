"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by feng on 2017/4/29.
 */
class LoadbalanceStats {
    constructor() {
        this.zoneMap = {};
        this.zoneStatsMap = {};
        this.connectionFailureThreshold = 3;
        this.maxCircuitTrippedTimeout = 30000;
    }
}
exports.default = LoadbalanceStats;
module.exports = exports["default"];