class Config {
    public apikey: string

    constructor(apikey:string){
        this.apikey=apikey
    }
}

var conf = new Config(process.env.QUBITRO_API_KEY?process.env.QUBITRO_API_KEY:"")

function init (config:Config) {
    conf = config
}

export {Config,conf,init}