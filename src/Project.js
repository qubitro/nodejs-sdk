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
exports.getProjectById = exports.getProjects = exports.Project = void 0;
const axios_1 = __importDefault(require("axios"));
const Config_1 = require("./Config");
class Project {
    constructor(id, name, description, created) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.created = created;
    }
    delete() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.delete(`https://api.qubitro.com/v2/projects/${this.id}`, {
                    headers: {
                        Authorization: (0, Config_1.getConf)().apikey ? `Bearer ${(0, Config_1.getConf)().apikey}` : ''
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
exports.Project = Project;
function getProjects() {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://api.qubitro.com/v2/projects`, {
                headers: {
                    Authorization: (0, Config_1.getConf)().apikey ? `Bearer ${(0, Config_1.getConf)().apikey}` : ''
                }
            });
            const projects = [];
            const body = response.data.data;
            body.forEach(el => {
                projects.push(el);
            });
            resolve(projects);
        }
        catch (error) {
            reject(error.response.data.message ? error.response.data.message : error);
        }
    }));
}
exports.getProjects = getProjects;
function getProjectById(projectID) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`https://api.qubitro.com/v2/projects/${projectID}`, {
                headers: {
                    Authorization: (0, Config_1.getConf)().apikey ? `Bearer ${(0, Config_1.getConf)().apikey}` : ''
                }
            });
            const body = response.data.data;
            resolve(body);
        }
        catch (error) {
            reject(error.response.data.message ? error.response.data.message : error);
        }
    }));
}
exports.getProjectById = getProjectById;
