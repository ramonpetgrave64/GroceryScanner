

const bodyParser = require('body-parser');
const express = require('express');
const models = require('./models');
const passport = require('./middlewares/authentication');
const expressSession = require('express-session');
const flash = require('connect-flash');
const keys = require('./config/keys');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const stripe = require("stripe")(keys.stripeKeySecret);


const PORT = process.env.PORT || 8000;

const app = express();

app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		let namespace = param.split('.'),
		root = namespace.shift(),
		formParam = root;

		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param: formParam,
			msg: msg,
			value: value
		};
	}
}));
app.use(flash());
app.use(expressSession({secret: keys.expressSessionKey, resave: false, saveUninitialized: true}));
app.use((req, res, next) => {
	res.locals.messages = require('express-messages')(req, res);
	next();
});
app.use(passport.initialize());
app.use(passport.session());


// Uncomment the following if you want to serve up static assets.
// (You must create the public folder)

app.use(express.static('./public'));


// Uncomment the following if you want to use handlebars
// on the backend. (You must create the views folder)
/*
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views/`);
*/



// Load up all of the controllers
const controllers = require('./controllers');
app.use('/api', controllers);


// First, make sure the Database tables and models are in sync
// then, start up the server and start listening.
models.sequelize.sync({force: false})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running on port: ${PORT}`);
    });
  });

module.exports = {app};
