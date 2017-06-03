/**
 *
 * @param serverState {object} @see {ServerStats}
 * @return            {number}
 */
export function incrementServerFailureCounts(serverState) {
    if (!serverState.serverFailureCounts) {
        serverState.serverFailureCounts = 0;
    }

    return ++serverState.serverFailureCounts;
}

export function incrementServerActiveRequests(serverState) {
    if (!serverState.activeRequestsCount) {
        serverState.activeRequestsCount = 0;
    }

    serverState.lastActiveRequestsCountChangeTimestamp = new Date();
    return ++serverState.serverFailureCounts;
}

export function incrementTotalRequests(serverState) {
    if (!serverState.totalRequests) {
        serverState.totalRequests = 0;
    }

    return ++serverState.totalRequests;
}

export function decrementServerActiveRequests(serverState) {
    if (!serverState.activeRequestsCount) {
        return serverState.activeRequestsCount = 0;
    }

    serverState.lastActiveRequestsCountChangeTimestamp = new Date();
    return --serverState.activeRequestsCount;
}

export function noteConnectionFaildTime(serverState) {
    serverState.lastConnectionFailedTimestamp = new Date();
}

export function note() {

}