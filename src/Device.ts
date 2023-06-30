import axios from "axios"
import { getConf, Err } from "./Config"

class Device {
    id: string
    name: string
    description: string
    brand: string
    model: string
    avatar: string
    lastSeen: Date
    projectId: string

    constructor(id: string, name: string, description: string, brand: string, model: string, avatar: string, lastSeen: Date, projectId: string) {
        this.id = id
        this.name = name
        this.description = description
        this.brand = brand
        this.model = model
        this.avatar = avatar
        this.lastSeen = lastSeen
        this.projectId = projectId
    }

    delete(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.delete(`https://api.qubitro.com/v2/projects/${this.projectId}/devices/${this.id}`, {
                    headers: {
                        Authorization: getConf().apikey ? `Bearer ${getConf().apikey}` : ''
                    }
                })

                resolve(response.data.message)
            } catch (error: any) {
                if (!error.response.data) {
                    reject(new Err(418, error.message))
                    return
                }

                reject(new Err(error.response.data.stauts, error.response.data.message))
            }
        })
    }
}

function getDevices(projectID: string): Promise<Device[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://api.qubitro.com/v2/projects/${projectID}/devices`, {
                headers: {
                    Authorization: getConf().apikey ? `Bearer ${getConf().apikey}` : ''
                }
            })

            const devices: Array<Device> = []
            const body: Array<Device> = response.data.data

            body.forEach(el => {
                devices.push(el)
            })

            resolve(devices)
        } catch (error: any) {
            if (!error.response.data) {
                reject(new Err(418, error.message))
                return
            }

            reject(new Err(error.response.data.stauts, error.response.data.message))
        }
    })
}

function getDeviceById(projectID: string, deviceID: string): Promise<Device> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://api.qubitro.com/v2/projects/${projectID}/devices/${deviceID}`, {
                headers: {
                    Authorization: getConf().apikey ? `Bearer ${getConf().apikey}` : ''
                }
            })

            const body: Device = response.data.data

            resolve(body)
        } catch (error: any) {
            if (!error.response.data) {
                reject(new Err(418, error.message))
                return
            }

            reject(new Err(error.response.data.stauts, error.response.data.message))
        }
    })
}


export { Device, getDevices, getDeviceById }