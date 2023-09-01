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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDataByDeviceId = exports.getDataKeys = exports.getDataByTimeAndKeys = exports.getDataByTime = exports.getDataByKeys = exports.getData = void 0;
var axios_1 = require("axios");
var Config_1 = require("./Config");
function fetchDeviceData(projectID, deviceID, params) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var response, result_1, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, axios_1.default.get("https://api.qubitro.com/v2/projects/".concat(projectID, "/devices/").concat(deviceID, "/data"), {
                                        headers: {
                                            Authorization: (0, Config_1.getConf)().apikey ? "Bearer ".concat((0, Config_1.getConf)().apikey) : ''
                                        },
                                        params: params
                                    })];
                            case 1:
                                response = _a.sent();
                                result_1 = [];
                                response.data.data.forEach(function (el) {
                                    result_1.push(el);
                                });
                                resolve(result_1);
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                if (!error_1.response.data) {
                                    reject(new Config_1.Err(418, error_1.message));
                                    return [2 /*return*/];
                                }
                                reject(new Config_1.Err(error_1.response.data.status, error_1.response.data.message));
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
function getData(projectID, deviceID, page, limit) {
    return __awaiter(this, void 0, void 0, function () {
        var params;
        return __generator(this, function (_a) {
            params = {
                page: page,
                limit: limit,
                range: "all"
            };
            return [2 /*return*/, fetchDeviceData(projectID, deviceID, params)];
        });
    });
}
exports.getData = getData;
function getDataByKeys(projectID, deviceID, page, limit, keys) {
    return __awaiter(this, void 0, void 0, function () {
        var keysParam, params;
        return __generator(this, function (_a) {
            keysParam = keys.join(", ");
            params = {
                page: page,
                limit: limit,
                range: "all",
                keys: keysParam
            };
            return [2 /*return*/, fetchDeviceData(projectID, deviceID, params)];
        });
    });
}
exports.getDataByKeys = getDataByKeys;
function getDataByTime(projectID, deviceID, page, limit, start, end) {
    return __awaiter(this, void 0, void 0, function () {
        var params;
        return __generator(this, function (_a) {
            params = {
                page: page,
                limit: limit,
                range: "time",
                start: start,
                end: end
            };
            return [2 /*return*/, fetchDeviceData(projectID, deviceID, params)];
        });
    });
}
exports.getDataByTime = getDataByTime;
function getDataByTimeAndKeys(projectID, deviceID, page, limit, start, end, keys) {
    return __awaiter(this, void 0, void 0, function () {
        var keysParam, params;
        return __generator(this, function (_a) {
            keysParam = keys.join(", ");
            params = {
                page: page,
                limit: limit,
                range: "time",
                start: start,
                end: end,
                keys: keysParam
            };
            return [2 /*return*/, fetchDeviceData(projectID, deviceID, params)];
        });
    });
}
exports.getDataByTimeAndKeys = getDataByTimeAndKeys;
function getDataKeys(projectID, deviceID) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var response, result_2, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, axios_1.default.get("https://api.qubitro.com/v2/projects/".concat(projectID, "/devices/").concat(deviceID, "/data/keys"), {
                                        headers: {
                                            Authorization: (0, Config_1.getConf)().apikey ? "Bearer ".concat((0, Config_1.getConf)().apikey) : ''
                                        }
                                    })];
                            case 1:
                                response = _a.sent();
                                result_2 = [];
                                response.data.data.forEach(function (el) {
                                    result_2.push(el);
                                });
                                resolve(result_2);
                                return [3 /*break*/, 3];
                            case 2:
                                error_2 = _a.sent();
                                if (!error_2.response.data) {
                                    reject(new Config_1.Err(418, error_2.message));
                                    return [2 /*return*/];
                                }
                                reject(new Config_1.Err(error_2.response.data.status, error_2.response.data.message));
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.getDataKeys = getDataKeys;
function deleteDataByDeviceId(projectID, deviceID) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.delete("https://api.qubitro.com/v2/projects/".concat(projectID, "/devices/").concat(deviceID, "/data"), {
                            headers: {
                                Authorization: (0, Config_1.getConf)().apikey ? "Bearer ".concat((0, Config_1.getConf)().apikey) : ''
                            }
                        })];
                case 1:
                    response = _a.sent();
                    resolve(response.data.message);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    if (!error_3.response.data) {
                        reject(new Config_1.Err(418, error_3.message));
                        return [2 /*return*/];
                    }
                    reject(new Config_1.Err(error_3.response.data.status, error_3.response.data.message));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
}
exports.deleteDataByDeviceId = deleteDataByDeviceId;
