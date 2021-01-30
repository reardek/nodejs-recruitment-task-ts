
const entityPath = process.env.NODE_ENV === 'production' ? "/src/entity/*.js" : "/src/entity/*.ts"
module.exports = {
  type: "mariadb",
  host: "localhost",
  port: 3306,
  username: "root",
  password: `${process.env.MARIADB_PASSWORD}`,
  database: "OMDB",
  entities: [__dirname + entityPath],
  dropSchema: true,
  logging: false,
};
