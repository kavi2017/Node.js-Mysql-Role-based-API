require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');
const session = require('express-session');
const redis = require('redis');
//const redisStore = require('connect-redis')(session);
//const client  = redis.createClient();
var redisClient = redis.createClient(6379, '123.45.678.901');
var RedisStore = require('connect-redis')(session);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
/*app.use(session({
    secret: 'PV3o8ip5V8',
    resave: false,
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
    saveUninitialized: false
    cookie: {
        //httpOnly: true,
        maxAge: 3600000
      }
  }));*/
  app.use(session({
	//store: new RedisStore({client: redisClient}),
    secret: 'gBpwmwE0PmyDKPuLhhmY8CONJQW3TnCujQuoE8nVao',
    cookie: { maxAge: 60000 },
    rolling: true,
    resave:true,
  	saveUninitialized: true
    }));

    redisClient.on("error", function (err) {
        //console.log(" Error " + err);
    });


// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});