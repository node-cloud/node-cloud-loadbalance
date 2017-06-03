/**
 * Created by feng on 2017/4/29.
 */
export default class ServerStats {
    constructor() {
        this.serverFailureCounts = 0;
        this.activeRequestsCount = 0;
        this.totalRequests = 0;
        this.lastConnectionFailedTimestamp = null;
        this.firstConnectionTimestamp = 0;
        this.connectionFailureThreshold = 3;
        this.lastActiveRequestsCountChangeTimestamp = 0;
        this.activeRequestsCountTimeout = 10; //10 seconds
    }

    noteResponseTime() {

    }

    getResponseTimeAvg() {

    }

    getResponseTimeMax() {

    }

    getActiveRequestsCount(currentTime) {
        const count = this.activeRequestsCount;
        if (count === 0) {
            return 0;
        } else if (currentTime - this.lastActiveRequestsCountChangeTimestamp > this.activeRequestsCountTimeout * 1000 || count < 0) {
            return this.activeRequestsCount = 0;
        } else {
            return count;
        }
    }

    isCircuitBreakerTripped(currentTime) {

    }
}