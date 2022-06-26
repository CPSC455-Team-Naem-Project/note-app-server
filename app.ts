import {connect} from 'mongoose';
import {UserFile} from "./models/UserFile";

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const filesRouter = require('./routes/files');
const db = require('./models/db')

const app = express();
const expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https']
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/files', filesRouter);

module.exports = app;
