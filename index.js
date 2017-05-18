const path = require('path');
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(
  // [
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://api.stripe.com'],
      frameSrc: ["'self'", 'https://js.stripe.com'],
      // childSrc: ["'self'", 'https://js.stripe.com'],
      scriptSrc: ["'self'", 'https://js.stripe.com', "'unsafe-inline'"],
      styleSrc: ['https://js.stripe.com'],
      fontSrc: ['https://js.stripe.com'],
      imgSrc: ["'self'", 'https://js.stripe.com'],
    }
  })
  // helmet.noCache()
// ]
);

app.use((req, res, next) => {
  console.log('CSP', res.get('Content-Security-Policy'));
  next();
});


// app.use(express.static('public', {
//   etag: false, 
//   maxage: '0'
// }));

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(5000, () => {
  console.log('listening');
});

