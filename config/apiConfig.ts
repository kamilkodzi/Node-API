import session from "express-session";

const store = new session.MemoryStore();

const apiConfig = {
  maximumRowsPerGetRequest: 500,
  defaultAmountOfRowsPerGetRquest: 100,
  port: 4050,
};

const sessionConfig = {
  secret: process.env.SECRET_SESSION_ID,
  cookie: { maxAge: 365 * 24 * 60 * 60 * 1 },
  resave: true,
  saveUninitialized: true,
  store,
};

export = { apiConfig, sessionConfig };
