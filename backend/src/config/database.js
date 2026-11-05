export default {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: process.env.DB_PASSWORD,
    database: 'dev-burger-db',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
};
