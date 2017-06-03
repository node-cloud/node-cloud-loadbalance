import HttpClientDelegate from './HttpClientDelegate';
import * as httpClient from './DefaultHttpClient';
import * as stateRecoder from './StateRecoder';

export default class LoadbalanceClient {
    constructor(loadbalancer) {
        this.loadbalancer = loadbalancer;
        this.client = new HttpClientDelegate(httpClient, (service, request) => {
            stateRecoder.incrementServerActiveRequests(service.state);
            stateRecoder.incrementTotalRequests(service.state);
        }, (service, error, response, request) => {
            if (error) {
                stateRecoder.incrementServerFailureCounts(service.state);
                stateRecoder.noteConnectionFaildTime(service.state);
            }

            stateRecoder.decrementServerActiveRequests(service.state);
        });
    }

    addService(service) {
        this.loadbalancer.addService(service);
    }

    removeService(serviceId) {
        return this.loadbalancer.removeService(serviceId);
    }

    choose() {
        return this.loadbalancer.chooseService();
    }

    execute(serviceId, request, options) {

    }

    /**
     * Send a http request by loadbalancer.
     *
     * @param  request          {object}  @see {Request} for detail.
     * @param  request.params   {object}  The uri variables.
     * @param  options          {object}  The configuration of this request.
     * @param  options.security {boolean} Use 'https' or 'http' to send request.
     * @return                  {Promise}
     * @link   https://github.com/request/request
     */
    executeWithLoadBalance(request, options = {security: false}) {
        const service = this.choose();
        let url = options.security ? 'https://' : 'http://' + service.address;
        if (service.port !== 80) {
            url += ':' + service.port
        }

        request.url = url + request.url;
        return this.client.send(service, request);
    }
}