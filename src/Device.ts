import axios from "axios"
import {getConf} from "./Config"

class Device {
 id:string
 name:string
 description:string
 brand:string
 model:string
 avatar:string
 lastSeen:Date
 projectId:string

    constructor(id:string, name:string, description:string, brand:string, model:string, avatar:string, lastSeen:Date, projectId:string) {
        this.id = id
        this.name = name
        this.description = description
        this.brand = brand
        this.model = model
        this.avatar = avatar
        this.lastSeen = lastSeen
        this.projectId = projectId
    }

    delete() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.delete(`https://api.qubitro.com/v2/projects/${this.projectId}/devices/${this.id}`, {
                    headers: {
                        Authorization: getConf().apikey ? `Bearer ${getConf().apikey}`: ''
                    }
                })

                resolve(response.data.message)
            } catch (error:any) {
                reject(error.response.data.message ? error.response.data.message : error)
            }
        })
    }
}

function getDevices(projectID:string): Promise<Device[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://api.qubitro.com/v2/projects/${projectID}/devices`, {
                headers: {
                    Authorization: getConf().apikey ? `Bearer ${getConf().apikey}`: ''
                }
            })

            const devices:Array<Device> = []
            const body:Array<Device> = response.data.data

            body.forEach(el => {
                devices.push(el)
            })

            resolve(devices)
        } catch (error:any) {
            reject(error.response.data.message ? error.response.data.message : error)
        }
    })
}

function getDeviceById(projectID:string, deviceID:string): Promise<Device> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://api.qubitro.com/v2/projects/${projectID}/devices/${deviceID}`, {
                headers: {
                    Authorization: getConf().apikey ? `Bearer ${getConf().apikey}`: ''
                }
            })

           const body:Device=response.data.data

            resolve(body)
        } catch (error:any) {
            reject(error.response.data.message ? error.response.data.message : error)
        }
    })
}


export {Device,getDevices,getDeviceById}