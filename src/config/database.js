const config = {
  default: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'docker',
    dialect: process.env.DB_DIALECT || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    host: process.env.DB_HOST || 'db',
  },
  development: {
    extend: 'default',
    database: process.env.DB_NAME || 'postgres',
  },
  test: {
    extend: 'default',
    database: 'this-testing',
  },
  production: {
    extend: 'default',
    use_env_variable: 'DATABASE_URL',
  },
};

Object.keys(config).forEach((configKey) => {
  const configValue = config[configKey];
  if (configValue.extend) {
    config[configKey] = { ...config[configValue.extend], ...configValue };
  }
});

module.exports = config;
