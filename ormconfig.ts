export = {
  host: 'localhost',
  type: 'mysql',
  port: '3309',
  username: 'root',
  password: 'admin123',
  database: 'soccer_fly',
  entities: ['dist/**/*.entity.js'],
  migrations: ['./src/migration/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
};
