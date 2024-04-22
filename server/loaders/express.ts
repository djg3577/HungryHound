import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "../api/routes";
import config from "../config";
import { errors } from "celebrate";
import cookieParser from "cookie-parser";
const listEndpoints = require('express-list-endpoints');

export default ({ app }: { app: Application }) => {
  app.get("/status", (req, res) => {
    res.status(200).json("Working")
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });
  app.get('/routes', (req, res) => {
    res.status(200).send()
  })

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Some sauce I that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  app.use(require("method-override")());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Middleware that transforms string of cookies into a JSON
  app.use(cookieParser());

  // Load API routes
  console.log("loading routes");
  app.use(config.api.prefix, routes());

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).json({ message: err.message }).end();
    }
    return next(err);
  });

  // Celebrate Errors
  app.use(errors());

  // console.log("routes:");
  // console.log(listEndpoints(app));

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};