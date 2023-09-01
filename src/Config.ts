class Config {
    public apikey: string

    constructor(apikey: string) {
        this.apikey = apikey
    }
}

let conf: Config

function init(config: { apikey: string }) {
    conf = new Config(config.apikey)
}

function getConf() {
    return conf
}

class Err {
    public status: number
    public message: string

    constructor(status: number, message: string) {
        this.status = status
        this.message = message
    }
}

export { init, getConf, Err }