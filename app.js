import express from "express";
import morgan from "morgan";
import cors from "cors";
import { Sequelize } from "sequelize";

import contactsRouter from "./routes/contactsRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const startServer = async () => {
  const sequelize = new Sequelize('db_contacts_lpko', 'db_contacts_lpko_user', 'rK1JVYppSmJYhMoo8Qq4A9fils3ZNIZS', {
    host: 'dpg-cv7snk8fnakc73dtidj0-a.frankfurt-postgres.render.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });

  try {
    await sequelize.authenticate()
    console.log("Database connection successful");
  } catch (e) {
    console.log("Database connection failed with error: ", e);
    process.exit(1);
  }

  app.listen(3000, () => {
    console.log("Server is running. Use our API on port: 3000");
  });
};

startServer();
