import express from 'express';
import path from 'path';

export function configureRoutes(app, authenticate) {
  app.get('/', authenticate, (req, res, next) => {
    res.sendFile(path.join(__dirname, './views/index.html'));
  });

  app.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, './views/login.html'));
  });

  app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
}
