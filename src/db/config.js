const {Pool} = require("pg");

const Config = () => {
    const config = {
        dbHost: 'localhost',
        dbPort: 5432,
        dbUser: 'jutioncandrakirana',
        dbPassword: '',
        dbName: 'todo_app',
        dbDriver: 'postgresql'
    }

    const connectionString = `${config.dbDriver}://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
    const db = new Pool({connectionString});

    return {db}
}

module.exports = Config;
