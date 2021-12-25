const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const http = require('http');
const {configureAuthentication} = require('./authentication');
const {configureJinaga} = require('./jinaga-config');
const {configureRoutes} = require('./routes');

const app = express();
const server = http.createServer(app);

app.use(session({
  secret: process.env.SESSION_SECRET || 'tacocat',
  resave: false,
  saveUninitialized: true,
}));
app.use(cookieParser());
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());

const authenticate = configureAuthentication(app);
configureRoutes(app, authenticate);
configureJinaga(app, authenticate);

server.listen(app.get('port'), () => {
  console.log(`  App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
  console.log('  Press CTRL-C to stop\n');
});
