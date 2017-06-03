"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.incrementServerFailureCounts = incrementServerFailureCounts;
exports.incrementServerActiveRequests = incrementServerActiveRequests;
exports.incrementTotalRequests = incrementTotalRequests;
exports.decrementServerActiveRequests = decrementServerActiveRequests;
exports.noteConnectionFaildTime = noteConnectionFaildTime;
exports.note = note;
/**
 *
 * @param serverState {object} @see {ServerStats}
 * @return            {number}
 */
function incrementServerFailureCounts(serverState) {
    if (!serverState.serverFailureCounts) {
        serverState.serverFailureCounts = 0;
    }

    return ++serverState.serverFailureCounts;
}

function incrementServerActiveRequests(serverState) {
    if (!serverState.activeRequestsCount) {
        serverState.activeRequestsCount = 0;
    }

    serverState.lastActiveRequestsCountChangeTimestamp = new Date();
    return ++serverState.serverFailureCounts;
}

function incrementTotalRequests(serverState) {
    if (!serverState.totalRequests) {
        serverState.totalRequests = 0;
    }

    return ++serverState.totalRequests;
}

function decrementServerActiveRequests(serverState) {
    if (!serverState.activeRequestsCount) {
        return serverState.activeRequestsCount = 0;
    }

    serverState.lastActiveRequestsCountChangeTimestamp = new Date();
    return --serverState.activeRequestsCount;
}

function noteConnectionFaildTime(serverState) {
    serverState.lastConnectionFailedTimestamp = new Date();
}

function note() {}