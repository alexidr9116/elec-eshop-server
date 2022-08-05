module.exports = {
    HOST: "13.48.133.252",
    USER: "robin_hood",
    PASSWORD: "robin_hood",
    DB: "game-server",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};