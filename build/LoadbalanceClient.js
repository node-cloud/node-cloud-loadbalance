'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _HttpClientDelegate = require('./HttpClientDelegate');

var _HttpClientDelegate2 = _interopRequireDefault(_HttpClientDelegate);

var _DefaultHttpClient = require('./DefaultHttpClient');

var httpClient = _interopRequireWildcard(_DefaultHttpClient);

var _StateRecoder = require('./StateRecoder');

var stateRecoder = _interopRequireWildcard(_StateRecoder);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LoadbalanceClient {
    constructor(loadbalancer) {
        this.loadbalancer = loadbalancer;
        this.client = new _HttpClientDelegate2.default(httpClient, (service, request) => {
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

    execute(serviceId, request, options) {}

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
    executeWithLoadBalance(request, options = { security: false }) {
        const service = this.choose();
        let url = options.security ? 'https://' : 'http://' + service.address;
        if (service.port !== 80) {
            url += ':' + service.port;
        }

        request.url = url + request.url;
        return this.client.send(service, request);
    }
}
exports.default = LoadbalanceClient;
module.exports = exports['default'];