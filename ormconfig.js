module.exports = {
  type: "mariadb",
  host: "localhost",
  port: 3306,
  username: "root",
  password: `${process.env.MARIADB_PASSWORD}`,
  database: "OMDB",
  entities: [__dirname + "/src/entity/*.ts"],
  dropSchema: true,
  logging: false,
};
