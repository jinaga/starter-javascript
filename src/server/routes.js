const express = require('express');
const path = require('path');
const { renderImage } = require('./images');
const { manifest } = require('./manifest');

function configureRoutes(app, authenticate) {
  app.use((req, res, next) => {
    // Ensure the page is secure, or that we are running a development build
    if ( req.headers['x-forwarded-proto'] === 'https'
      || req.headers['x-arr-ssl']
      || process.env.NODE_ENV === 'development') {
      next();
    } else {
      res.redirect(`https://${req.hostname}${req.url}`);
    }
  });

  app.get('/manifest.json', (req, res) => {
    res
        .header('Content-Type', 'application/json')
        .send(JSON.stringify(manifest));
  });

  app.get(/^\/(index.html)?$/, authenticate, (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/server/index.html'));
  });

  app.get(/^\/login(.html)?$/, (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../views/login.html'));
  });

  app.get('/images/logo.png', (req, res) => {
    const imageFileName = './images/logo.png';
    renderImage(req, res, imageFileName);
  });

  app.use('/scripts', express.static(path.join(__dirname, '../../dist/scripts')));
}

module.exports = {
  configureRoutes
};