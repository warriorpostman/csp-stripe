const path = require('path');
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      // defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://api.stripe.com'],
      frameSrc: ["'self'", 'https://js.stripe.com'],
      // childSrc: ["'self'", 'https://js.stripe.com'],
      scriptSrc: [ "'self'", 'https://js.stripe.com', ],
    }
  })
);

app.set('etag', false);
app.use((req, res, next) => {
  console.log('CSP: :', res.get('Content-Security-Policy'));
  console.log('etag :', res.get('Etag'));
  next();
});

app.use('/style', (req, res) => {
  return res.sendFile(path.join(__dirname, 'public/style.css'));
});

app.use('/script', (req, res) => {
  return res.sendFile(path.join(__dirname, 'public/script.js'));
});

app.use('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(5000, () => {
  console.log('listening');
});

