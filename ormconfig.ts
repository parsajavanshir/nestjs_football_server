export = {
  host: 'localhost',
  type: 'mysql',
  port: '3309',
  username: 'root',
  password: 'admin123',
  database: 'soccer_fly',
  entities: ['src/**/entity/**.ts'],
  migrations: ['./src/migration/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
};
