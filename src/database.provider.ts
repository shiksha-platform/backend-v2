import { DataSource } from "typeorm";

export const DatabaseProviders = [
  {
    provide: "DATA_SOURCE",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 5432,
        database: "postgres",
        password: "postgres",
        username: "postgres",
        entities: [__dirname + "./entities/**/*.ts"],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
