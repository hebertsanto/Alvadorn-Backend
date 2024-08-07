import express, { Express } from "express";
import { loggerService } from "./api/infraestructure/logger/LoggerService";
import { AppRoutes } from "./api/infraestructure/express/routes/routes";
import cors from "cors";

export class ExpressApp {
  private expressApp: Express;

  constructor() {
    this.expressApp = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.expressApp.use(express.json());
    this.expressApp.use(
      cors({
        origin: process.env.ORIGIN,
      }),
    );
  }

  private routes() {
    this.expressApp.use("/api/v1", AppRoutes);
  }

  public start(port: number | string) {
    return this.expressApp.listen(port, () => {
      loggerService.info(`Sever is running on por ${port}!`);
    });
  }

  public getApp(): Express {
    return this.expressApp;
  }
}
