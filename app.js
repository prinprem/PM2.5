const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');

const user = require('./routes/userRoute');
const line = require('./routes/lineRoute');

const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin',  req.headers.origin);
    res.header('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, X-XSRF-TOKEN');
    next();
});

app.use('/user', user);
app.use('/line', line);
// app.use('/todo', todo);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(8000, () => console.log('server run listening on port 8000'));
