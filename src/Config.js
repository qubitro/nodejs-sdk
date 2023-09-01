"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Err = exports.getConf = exports.init = void 0;
var Config = /** @class */ (function () {
    function Config(apikey) {
        this.apikey = apikey;
    }
    return Config;
}());
var conf;
function init(config) {
    conf = new Config(config.apikey);
}
exports.init = init;
function getConf() {
    return conf;
}
exports.getConf = getConf;
var Err = /** @class */ (function () {
    function Err(status, message) {
        this.status = status;
        this.message = message;
    }
    return Err;
}());
exports.Err = Err;
