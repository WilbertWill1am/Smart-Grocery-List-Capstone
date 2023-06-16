import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import ListRoute from "./routes/ListRoute.js";
import CategoriesRoute from "./routes/CategoriesRoute.js";
import db from "./config/database.js";
import http from "http";

dotenv.config();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(UserRoute, ProductRoute, ListRoute, CategoriesRoute);
// app.use(ProductRoute);
// app.use(ListRoute);
// app.use(ListRoute);

db.sync();
// routes(app, express);

// app.listen(port, () => console.log("Server up and running..."));
// const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;
const httpServer = http.createServer(app);
app.get("/", (req, res) => {
  res.send(`Welcome to Grocery List API`);
});

console.log(`Server listening on: http://${HOST}:${port}`);
httpServer.listen(port, HOST);
