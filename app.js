const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();
const orderRouter = require('./routes/order');
const indexRouter = require('./routes/index');

const clientRouter = require('./routes/client');

const app = express();
const PORT = process.env.PORT ?? 4000;

const sessionConfig = {
  store: new FileStore(),
  key: 'user_sid',
  secret: `${process.env.SECRET_WORD}`,
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/client', clientRouter);
app.use('/order', orderRouter);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
