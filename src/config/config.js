const dotenv = require ("dotenv")
const program = require ("../utils/commander")

const {mode} = program.opts(); 

dotenv.config({
    path: mode === "desarrollo"?"./.env.desarrollo": "./.env.produccion"
}); 

let configObject = {
    puerto: process.env.PUERTO,
    mongo_url: process.env.MONGO_URL
}

module.exports = configObject;