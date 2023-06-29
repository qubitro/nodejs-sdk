import axios from "axios"
import {getConf} from "./Config"

class Project {
 id:string
 name:string
 description:string
 created:Date

    constructor(id:string, name:string, description:string, created:Date) {
        this.id = id
        this.name = name
        this.description = description
        this.created = created
    }

    delete() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.delete(`https://api.qubitro.com/v2/projects/${this.id}`, {
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

function getProjects  () {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://api.qubitro.com/v2/projects`, {
                headers: {
                    Authorization: getConf().apikey ? `Bearer ${getConf().apikey}`: ''
                }
            })

            const projects:Array<Project> = []
            const body:Array<{id:string,name:string,description:string,created:Date}> = response.data.data

            body.forEach(el => {
                const temp = new Project(el.id, el.name, el.description, el.created)
                projects.push(temp)
            })

            resolve(projects)
        } catch (error:any) {
            reject(error.response.data.message ? error.response.data.message : error)
        }
    })
}

function getProjectById  (projectID:string) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`https://api.qubitro.com/v2/projects/${projectID}`, {
                headers: {
                    Authorization: getConf().apikey ? `Bearer ${getConf().apikey}`: ''
                }
            })

           const body:{id:string,name:string,description:string,created:Date}=response.data.data

            resolve(new Project(body.id,body.name,body.description,body.created))
        } catch (error:any) {
            reject(error.response.data.message ? error.response.data.message : error)
        }
    })
}

export {Project,getProjects,getProjectById}