const { Sequelize } = require("sequelize");



const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: "localhost",
        dialect: "mysql",
        logging: false
    }
);

(async () => {
    try {
        await sequelize.sync();
        console.log('Connection has been establised successfully.');

    } catch (err) {
        console.log('Unable to connect to the database:', err);
    }
})();


module.exports = sequelize;