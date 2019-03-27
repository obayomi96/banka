const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(morgan('dev'));
app.use(express.static('ui'));

app.use('/api/v1/', routes);

// Error handling
app.use('*', (req, res) => {
  res.status(404).json({
    msg: 'Opps!!, the page you are looking for cannot be found',
  });
});

// export default app;
module.exports = app;
