import axios from "axios"
import { getConf, Err } from "./Config"

async function fetchDeviceData(projectID: string, deviceID: string, params: Object): Promise<any[]> {
  return new Promise<any[]>(async (resolve, reject) => {
    try {
      const response = await axios.get(`https://api.qubitro.com/v2/projects/${projectID}/devices/${deviceID}/data`, {
        headers: {
          Authorization: getConf().apikey ? `Bearer ${getConf().apikey}` : ''
        },
        params: params
      })

      const result: any[] = []

      response.data.data.forEach((el: any) => {
        result.push(el)
      });

      resolve(result)
    } catch (error: any) {
      if (!error.response.data) {
        reject(new Err(418, error.message))
        return
      }

      reject(new Err(error.response.data.status, error.response.data.message))
    }
  });
}

async function getData(projectID: string, deviceID: string, page: number, limit: number): Promise<any[]> {
  const params = {
    page: page,
    limit: limit,
    range: "all"
  };

  return fetchDeviceData(projectID, deviceID, params);
}

async function getDataByKeys(projectID: string, deviceID: string, page: number, limit: number, keys: Array<string>): Promise<any[]> {
  const keysParam = keys.join(", ");

  const params = {
    page: page,
    limit: limit,
    range: "all",
    keys: keysParam
  };

  return fetchDeviceData(projectID, deviceID, params);
}
async function getDataByTime(projectID: string, deviceID: string, page: number, limit: number, start: Date, end: Date): Promise<any[]> {
  const params = {
    page: page,
    limit: limit,
    range: "time",
    start: start,
    end: end
  };

  return fetchDeviceData(projectID, deviceID, params);
}

async function getDataByTimeAndKeys(projectID: string, deviceID: string, page: number, limit: number, start: Date, end: Date, keys: Array<string>): Promise<any[]> {
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
}

async function getDataKeys(projectID: string, deviceID: string): Promise<string[]> {
  return new Promise<string[]>(async (resolve, reject) => {
    try {
      const response = await axios.get(`https://api.qubitro.com/v2/projects/${projectID}/devices/${deviceID}/data/keys`, {
        headers: {
          Authorization: getConf().apikey ? `Bearer ${getConf().apikey}` : ''
        }
      });

      const result: string[] = []

      response.data.data.forEach((el: string) => {
        result.push(el)
      });

      resolve(result)
    } catch (error: any) {
      if (!error.response.data) {
        reject(new Err(418, error.message))
        return
      }

      reject(new Err(error.response.data.status, error.response.data.message))
    }
  })
}

function deleteDataByDeviceId(projectID: string, deviceID: string): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const response = await axios.delete(`https://api.qubitro.com/v2/projects/${projectID}/devices/${deviceID}/data`, {
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

      reject(new Err(error.response.data.status, error.response.data.message))
    }
  })
}

export { getData, getDataByKeys, getDataByTime, getDataByTimeAndKeys, getDataKeys, deleteDataByDeviceId }