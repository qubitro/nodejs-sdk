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
exports.getDeviceById = exports.getDevices = exports.Device = void 0;
const axios_1 = __importDefault(require("axios"));
const Config_1 = require("./Config");
class Device {
    constructor(id, name, description, brand, model, avatar, lastSeen, projectId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.model = model;
        this.avatar = avatar;
        this.lastSeen = lastSeen;
        this.projectId = projectId;
    }
    delete() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.delete(`https://api.qubitro.com/v2/projects/${this.projectId}/devices/${this.id}`, {
                    headers: {
                        Authorization: `Bearer ${Config_1.conf.apikey}`
                    }
                });
                resolve(response.data.message);
            }
            catch (error) {
                reject(error.response.data.message ? error.response.data.message : error);
            }
        }));
    }
}
exports.Device = Device;
function getDevices(projectID) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://api.qubitro.com/v2/project/${projectID}/devices`, {
                headers: {
                    Authorization: `Bearer ${Config_1.conf.apikey}`
                }
            });
            const devices = [];
            const body = response.data.data;
            body.forEach(el => {
                const temp = new Device(el.id, el.name, el.description, el.brand, el.model, el.avatar, el.last_seen, projectID);
                devices.push(temp);
            });
            resolve(devices);
        }
        catch (error) {
            reject(error.response.data.message ? error.response.data.message : error);
        }
    }));
}
exports.getDevices = getDevices;
function getDeviceById(projectID, deviceID) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://api.qubitro.com/v2/projects/${projectID}/devices/${deviceID}`, {
                headers: {
                    Authorization: `Bearer ${Config_1.conf.apikey}`
                }
            });
            const body = response.data.data;
            resolve(new Device(body.id, body.name, body.description, body.brand, body.model, body.avatar, body.last_seen, projectID));
        }
        catch (error) {
            reject(error.response.data.message ? error.response.data.message : error);
        }
    }));
}
exports.getDeviceById = getDeviceById;
