const env = process.env;

const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  timezone: "+09:00",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  timezone: "+09:00",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  timezone: "+09:00",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
};

module.exports = { development, production, test };
