import * as express from "express";
import * as mongoose from "mongoose";
import * as compression from "compression"; // compresses requests
import * as cors from "cors";
import * as logger from "morgan";
import * as helmet from "helmet";
import * as bluebird from "bluebird";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";

// Passport configuration & middlewares
import "./config/passport";
import apiV1Routes from "./router";
import { MONGODB_URI } from "./util/secrets";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

const app = express();

// Connect to MongoDB
(<any>mongoose).Promise = bluebird;
mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log(`DB Connection Success. Connected to ${MONGODB_URI}`);
  })
  .catch(err => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    // process.exit();
  });

app.set("port", process.env.SERVER_PORT || 3030);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1", apiV1Routes);

export default app;
