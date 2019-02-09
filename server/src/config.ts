export interface IConfig {
  NODE_ENV: string;
  host: string;
  port: number;
}

export const config: IConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",
  host: process.env.HOST || "0.0.0.0",
  port: parseInt(process.env.NODE_PORT, 10) || 3000,
};
