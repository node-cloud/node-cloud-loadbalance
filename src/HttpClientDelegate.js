import util from 'lodash';
import errors from 'request-promise/errors';

export default class HttpClientDelegate {
    constructor(client, before, after) {
        this.client = client;
        this.setBefore(before);
        this.setAfter(after);
    }

    setBefore(before) {
        if (util.isFunction(before)) {
            this.before = before;
        }
    }

    setAfter(after) {
        if (util.isFunction(after)) {
            this.after = after;
        }
    }

    async send(service, request) {
        if (this.before) {
            this.before(service, request);
        }

        let response, err;
        try {
            response = await this.client.send(request);
        } catch (e) {
            err = e;
        }


        if (this.after) {
            this.after(service, err, response, request);
        }

        if (err) {
            throw err;
        }

        const is2xx = /^2/.test('' + response.statusCode);

        //TODO if the status code is not 2xx, throw an exception.
        return response;
    }
}