"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.conf = exports.Config = void 0;
class Config {
    constructor(apikey) {
        this.apikey = apikey;
    }
}
exports.Config = Config;
var conf = new Config(process.env.QUBITRO_API_KEY ? process.env.QUBITRO_API_KEY : "");
exports.conf = conf;
function init(config) {
    exports.conf = conf = config;
}
exports.init = init;
