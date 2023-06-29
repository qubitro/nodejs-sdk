class Config {
    public apikey: string

    constructor(apikey:string){
        this.apikey=apikey
    }
}

var conf = new Config(process.env.QUBITRO_API_KEY?process.env.QUBITRO_API_KEY:"")

function init (config:{apikey:string}) {
    conf = new Config(config.apikey)
}

function getConf() {
    return conf
}

export {init,getConf}