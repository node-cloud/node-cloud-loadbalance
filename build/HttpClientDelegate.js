'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _errors = require('request-promise/errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class HttpClientDelegate {
    constructor(client, before, after) {
        this.client = client;
        this.setBefore(before);
        this.setAfter(after);
    }

    setBefore(before) {
        if (_lodash2.default.isFunction(before)) {
            this.before = before;
        }
    }

    setAfter(after) {
        if (_lodash2.default.isFunction(after)) {
            this.after = after;
        }
    }

    send(service, request) {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (_this.before) {
                _this.before(service, request);
            }

            let response, err;
            try {
                response = yield _this.client.send(request);
            } catch (e) {
                err = e;
            }

            if (_this.after) {
                _this.after(service, err, response, request);
            }

            if (err) {
                throw err;
            }

            const is2xx = /^2/.test('' + response.statusCode);

            //TODO if the status code is not 2xx, throw an exception.
            return response;
        })();
    }
}
exports.default = HttpClientDelegate;
module.exports = exports['default'];