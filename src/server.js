function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

const express = require('express');
const path = require('path');
const app = express();

app.use(requireHTTPS);
app.use(express.static('./dist/StarwarsClient'));
app.use(express.static(path.join(__dirname, "assets")));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/StarwarsClient/'}),
);

app.listen(process.env.PORT || 8080);
