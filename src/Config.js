"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConf = exports.init = void 0;
class Config {
    constructor(apikey) {
        this.apikey = apikey;
    }
}
let conf = new Config(process.env.QUBITRO_API_KEY ? process.env.QUBITRO_API_KEY : "");
function init(config) {
    conf = new Config(config.apikey);
}
exports.init = init;
function getConf() {
    return conf;
}
exports.getConf = getConf;
