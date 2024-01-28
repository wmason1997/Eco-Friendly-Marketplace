const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers'); // Make sure to adjust the path if needed
const searchRoute = require('./controllers/searchRoute');
const helpers = require('./utils/helpers');
//const passport = require('passport'); // Import Passport if needed

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
//app.use(passport.initialize());
//app.use(passport.session());

// Middleware
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use((req, res, next) => {
  console.log(`${req.method} request heard at ${req.url}`)
  next()
})

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'js')));

app.use(searchRoute);

app.use(routes);

app.post('/api/users/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// sequelize.sync({alter: true})
/*
    force: true
      overwrite all tables
    alter: true
      only make changes where necessary
*/
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
