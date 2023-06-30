import axios from "axios"
import { getConf, Err } from "./Config"

class Project {
    id: string
    name: string
    description: string
    created: Date

    constructor(id: string, name: string, description: string, created: Date) {
        this.id = id
        this.name = name
        this.description = description
        this.created = created
    }

    delete(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.delete(`https://api.qubitro.com/v2/projects/${this.id}`, {
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
}

function getProjects(): Promise<Project[]> {
    return new Promise<Project[]>(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://api.qubitro.com/v2/projects`, {
                headers: {
                    Authorization: getConf().apikey ? `Bearer ${getConf().apikey}` : ''
                }
            })

            const projects: Array<Project> = []
            const body: Array<Project> = response.data.data

            body.forEach(el => {
                projects.push(el)
            })

            resolve(projects)
        } catch (error: any) {
            if (!error.response.data) {
                reject(new Err(418, error.message))
                return
            }

            reject(new Err(error.response.data.status, error.response.data.message))
        }
    })
}

function getProjectById(projectID: string): Promise<Project> {
    return new Promise<Project>(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://api.qubitro.com/v2/projects/${projectID}`, {
                headers: {
                    Authorization: getConf().apikey ? `Bearer ${getConf().apikey}` : ''
                }
            })

            const body: Project = response.data.data;

            resolve(body);
        } catch (error: any) {
            if (!error.response.data) {
                reject(new Err(418, error.message))
                return
            }

            reject(new Err(error.response.data.status, error.response.data.message))
        }
    })
}


export { Project, getProjects, getProjectById }