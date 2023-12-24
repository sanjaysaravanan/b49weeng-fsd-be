// const express = require("express");
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
// cjs importing custom module
// const todosRouter = require("./routes/todos");

// mjs importing custom module
import usersRouter from "./routes/users.js";
import registerRouter from "./routes/auth/register.js";
import connectToDb from "./db-utils/mongoose-connection.js";
import loginRouter from "./routes/auth/login.js";

const server = express();

// await in the top-level / global scope is allowed
await connectToDb();

// middleware to process the body of the request
server.use(express.json()); // used to parse the body of the request
// middleware used to make our APIs cors compatible
server.use(cors());

// Logging middleware - used to log the request incoming at what time
const logger = (req, res, next) => {
  console.log("##", new Date().toISOString(), "##", req.url, " ", req.method);
  next();
};

server.use(logger);

const authorizationMiddleware = (req, res, next) => {
  console.log("authorization middleware", req.headers);

  const authToken = req.headers["auth-token"];

  try {
    jwt.verify(authToken, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ msg: "Unauthorized User" });
  }
};

server.use("/api/users", authorizationMiddleware, usersRouter);
server.use("/api/register", registerRouter);
server.use("/api/login", loginRouter);

const port = 8000;

server.listen(port, () => {
  console.log("listening on port " + port);
});
