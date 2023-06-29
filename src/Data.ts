import axios from "axios"
import { getConf } from "./Config"

type Data = Record<string, any>;
type DataKey = string;

async function fetchDeviceData(projectID: string, deviceID: string, params: Object): Promise<Data[]> {
    try {
      const response = await axios.get(`https://api.qubitro.com/v2/projects/${projectID}/devices/${deviceID}/data`, {
        headers: {
          Authorization: getConf().apikey ? `Bearer ${getConf().apikey}` : ''
        },
        params: params
      });
  
      return response.data.data;
    } catch (error: any) {
      throw error.response.data.message ? error.response.data.message : error;
    }
  }

  async function getData(projectID: string, deviceID: string, page: number, limit: number): Promise<Data[]> {
    const params = {
      page: page,
      limit: limit,
      range: "all"
    };
  
    return await fetchDeviceData(projectID, deviceID, params);
  }
  
  async function getDataByKeys(projectID: string, deviceID: string, page: number, limit: number, keys: Array<string>): Promise<Data[]> {
    const keysParam = keys.join(", ");
  
    const params = {
      page: page,
      limit: limit,
      range: "all",
      keys: keysParam
    };
  
    return await fetchDeviceData(projectID, deviceID, params);
  }
  async function getDataByTime(projectID: string, deviceID: string, page: number, limit: number, start: Date, end: Date): Promise<Data[]> {
    const params = {
      page: page,
      limit: limit,
      range: "time",
      start: start,
      end: end
    };
  
    return await fetchDeviceData(projectID, deviceID, params);
  }
  
  async function getDataByTimeAndKeys(projectID: string, deviceID: string, page: number, limit: number, start: Date, end: Date, keys: Array<string>): Promise<Data[]> {
    const keysParam = keys.join(", ");
  
    const params = {
      page: page,
      limit: limit,
      range: "time",
      start: start,
      end: end,
      keys: keysParam
    };
  
    return await fetchDeviceData(projectID, deviceID, params);
  }
  async function getDataKeys(projectID: string, deviceID: string): Promise<DataKey[]> {
    try {
      const response = await axios.get(`https://api.qubitro.com/v2/projects/${projectID}/devices/${deviceID}/data/keys`, {
        headers: {
          Authorization: getConf().apikey ? `Bearer ${getConf().apikey}` : ''
        }
      });
  
      return response.data.data;
    } catch (error: any) {
      throw error.response.data.message ? error.response.data.message : error;
    }
  }

function deleteDataByDeviceId  (projectID:string, deviceID:string) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(`https://api.qubitro.com/v2/projects/${projectID}/devices/${deviceID}/data`, {
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

export {getData,getDataByKeys,getDataByTime,getDataByTimeAndKeys,getDataKeys,deleteDataByDeviceId}