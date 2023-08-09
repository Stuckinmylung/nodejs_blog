const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to Db
db.connect();

// Apply Middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//
app.use(express.static(path.join(__dirname, 'public')));

// HTTP Logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
         handlebars.engine({
              
                extname: 'hbs',
     }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);

// Connect to port
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
