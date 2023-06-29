import axios from "axios"
import { conf } from "./Config"

function fetchDeviceData  (projectID:string, deviceID:string, params:Object) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://api.qubitro.com/v2/projects/${projectID}/devices/${deviceID}/data`, {
                headers: {
                    Authorization: `Bearer ${conf.apikey}`
                },

                params: params
            })

            resolve(response.data.data)
        } catch (error:any) {
            reject(error.response.data.message ? error.response.data.message : error)
        }
    })
}

function getData (projectID:string, deviceID:string, page:string, limit:string) {
    const params = {
        page: page,
        limit: limit,
        range: "all"
    }

    return fetchDeviceData(projectID, deviceID, params)
}

function getDataByKeys (projectID:string, deviceID:string, page:number, limit:number, keys:Array<string>){
    let keysParam = ""

    keys.forEach(el => {
        keysParam += `${el}, `
    })

    keysParam = keysParam.endsWith(", ") ? keysParam.slice(0, -2) : keysParam

    const params = {
        page: page,
        limit: limit,
        range: "all",
        keys: keysParam
    }

    return fetchDeviceData(projectID, deviceID, params)
}

function getDataByTime  (projectID:string, deviceID:string, page:number, limit:number, start:Date, end:Date) {
    const params = {
        page: page,
        limit: limit,
        range: "time",
        start: start,
        end: end
    }

    return fetchDeviceData(projectID, deviceID, params)
}

function getDataByTimeAndKeys  (projectID:string, deviceID:string, page:number, limit:number, start:Date, end:Date, keys:Array<string>) {
    let keysParam = ""

    keys.forEach(el => {
        keysParam += `${el}, `
    })

    keysParam = keysParam.endsWith(", ") ? keysParam.slice(0, -2) : keysParam

    const params = {
        page: page,
        limit: limit,
        range: "time",
        start: start,
        end: end,
        keys: keysParam
    }

    return fetchDeviceData(projectID, deviceID, params)
}

function getDataKeys  (projectID:string, deviceID:string) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://api.qubitro.com/v2/projects/${projectID}/devices/${deviceID}/data/keys`, {
                headers: {
                    Authorization: `Bearer ${conf.apikey}`
                }
            })

            resolve(response.data.data)
        } catch (error:any) {
            reject(error.response.data.message ? error.response.data.message : error)
        }
    })
}

function deleteDataByDeviceId  (projectID:string, deviceID:string) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(`https://api.qubitro.com/v2/projects/${projectID}/devices/${deviceID}/data`, {
                headers: {
                    Authorization: `Bearer ${conf.apikey}`
                }
            })

            resolve(response.data.message)
        } catch (error:any) {
            reject(error.response.data.message ? error.response.data.message : error)
        }
    })
}

export {getData,getDataByKeys,getDataByTime,getDataByTimeAndKeys,getDataKeys,deleteDataByDeviceId}