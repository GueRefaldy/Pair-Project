const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');
const routes = require('./routes/index.routes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: false,
  cookie: {secure: false, sameSite: true}
}))

app.use(routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});