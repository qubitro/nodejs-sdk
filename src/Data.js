"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDataByDeviceId = exports.getDataKeys = exports.getDataByTimeAndKeys = exports.getDataByTime = exports.getDataByKeys = exports.getData = void 0;
const axios_1 = __importDefault(require("axios"));
const Config_1 = require("./Config");
function fetchDeviceData(projectID, deviceID, params) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`https://api.qubitro.com/v2/projects/${projectID}/devices/${deviceID}/data`, {
                    headers: {
                        Authorization: (0, Config_1.getConf)().apikey ? `Bearer ${(0, Config_1.getConf)().apikey}` : ''
                    },
                    params: params
                });
                const result = [];
                response.data.data.forEach((el) => {
                    result.push(el);
                });
                resolve(result);
            }
            catch (error) {
                if (!error.response.data) {
                    reject(new Config_1.Err(418, error.message));
                    return;
                }
                reject(new Config_1.Err(error.response.data.status, error.response.data.message));
            }
        }));
    });
}
function getData(projectID, deviceID, page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            page: page,
            limit: limit,
            range: "all"
        };
        return fetchDeviceData(projectID, deviceID, params);
    });
}
exports.getData = getData;
function getDataByKeys(projectID, deviceID, page, limit, keys) {
    return __awaiter(this, void 0, void 0, function* () {
        const keysParam = keys.join(", ");
        const params = {
            page: page,
            limit: limit,
            range: "all",
            keys: keysParam
        };
        return fetchDeviceData(projectID, deviceID, params);
    });
}
exports.getDataByKeys = getDataByKeys;
function getDataByTime(projectID, deviceID, page, limit, start, end) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            page: page,
            limit: limit,
            range: "time",
            start: start,
            end: end
        };
        return fetchDeviceData(projectID, deviceID, params);
    });
}
exports.getDataByTime = getDataByTime;
function getDataByTimeAndKeys(projectID, deviceID, page, limit, start, end, keys) {
    return __awaiter(this, void 0, void 0, function* () {
        const keysParam = keys.join(", ");
        const params = {
            page: page,
            limit: limit,
            range: "time",
            start: start,
            end: end,
            keys: keysParam
        };
        return fetchDeviceData(projectID, deviceID, params);
    });
}
exports.getDataByTimeAndKeys = getDataByTimeAndKeys;
function getDataKeys(projectID, deviceID) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`https://api.qubitro.com/v2/projects/${projectID}/devices/${deviceID}/data/keys`, {
                    headers: {
                        Authorization: (0, Config_1.getConf)().apikey ? `Bearer ${(0, Config_1.getConf)().apikey}` : ''
                    }
                });
                const result = [];
                response.data.data.forEach((el) => {
                    result.push(el);
                });
                resolve(result);
            }
            catch (error) {
                if (!error.response.data) {
                    reject(new Config_1.Err(418, error.message));
                    return;
                }
                reject(new Config_1.Err(error.response.data.status, error.response.data.message));
            }
        }));
    });
}
exports.getDataKeys = getDataKeys;
function deleteDataByDeviceId(projectID, deviceID) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.delete(`https://api.qubitro.com/v2/projects/${projectID}/devices/${deviceID}/data`, {
                headers: {
                    Authorization: (0, Config_1.getConf)().apikey ? `Bearer ${(0, Config_1.getConf)().apikey}` : ''
                }
            });
            resolve(response.data.message);
        }
        catch (error) {
            if (!error.response.data) {
                reject(new Config_1.Err(418, error.message));
                return;
            }
            reject(new Config_1.Err(error.response.data.status, error.response.data.message));
        }
    }));
}
exports.deleteDataByDeviceId = deleteDataByDeviceId;
