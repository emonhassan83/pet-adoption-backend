import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

//* Middleware
app.use(cors());
// app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* routes
app.use("/api/v1", router);

//* middlewares
app.use(globalErrorHandler);
app.use(notFound);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
