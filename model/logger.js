// Morgan logger
// https://github.com/expressjs/morgan
const logger = require('morgan');
const moment = require('moment');
const SETTING = require('../settings');
const MESSAGE = require('../messages');

const PORT = process.env.PORT || SETTING.port || 3000;
const PROTOCOL = ( SETTING.https )? 'https' : 'http';

var startMessage = `===== ${MESSAGE.start} =====` + '\n' +
    new Date().toLocaleString() + '\n' +
    `${MESSAGE.runningEnv}: ${SETTING.runningEnv}` + '\n' +
    `${MESSAGE.protocol}: ${PROTOCOL}` + '\n' +
    `${MESSAGE.portListen}: ${PORT}` + '\n' +
    '===================' + '\n';

const DATEFORMAT = 'YYYY-MM-DD';

function logStream() {
    let fs = require('fs');
    let path = require('path');
    let FileStreamRotator = require('file-stream-rotator');
    let logDirectory = path.join(__dirname, '../' + SETTING.logFolder);

    // ensure log directory exists
    if ( !fs.existsSync(logDirectory) ) {
        fs.mkdirSync(logDirectory);
    }

    let logDocName = moment().format(DATEFORMAT) + '.log';
    let logDocPath = path.join(logDirectory, logDocName);
    fs.appendFileSync(logDocPath, startMessage);

    // create a rotating write stream
    return FileStreamRotator.getStream({
        date_format: DATEFORMAT,
        filename: path.join(logDirectory, '%DATE%.log'),
        frequency: 'daily',
        verbose: false
    });
}

module.exports = function(app) {

    logger.token('date', function() {
        return( new Date().toLocaleString() );
    });

    if (app.settings.env === 'development') {
        process.stdout.write(startMessage);
        app.use(logger('[:date] :remote-addr :remote-user ' +
            ':method :url HTTP/:http-version :status ' +
            ':res[content-length] - :response-time ms'));
    } else {
        app.use(logger('[:date] :remote-addr - :remote-user ' +
            '":method :url HTTP/:http-version" :status ' +
            ':res[content-length] ":referrer" ":user-agent"', {
                stream: logStream(),
                skip: function (req, res) { return res.statusCode < 400; }
            })
        );
    }
};
