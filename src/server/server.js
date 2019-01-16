import express from "express";
import http from "http";
import bodyParser from "body-parser";
import { configureRoutes } from "./routes";
import { configureJinaga } from "./jinaga-config";
import "source-map-support/register";

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 8080);
app.use(bodyParser.json());

configureRoutes(app);
configureJinaga(app);

server.listen(app.get("port"), () => {
    console.log(`  App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`);
    console.log("  Press CTRL-C to stop\n");
});