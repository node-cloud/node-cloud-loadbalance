/**
 * Created by feng on 2017/4/29.
 */
export default class LoadbalanceStats {
    constructor() {
        this.zoneMap = {};
        this.zoneStatsMap = {};
        this.connectionFailureThreshold = 3;
        this.maxCircuitTrippedTimeout = 30000;
    }
}