module.exports = function(bodyParser, app, qewdRouter, config) {
    // add/ define / configure your WebServer middleware

    app.use(bodyParser.json({limit: '1mb'}));
    app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
    app.use(bodyParser.text({ type: 'application/xml' }));
    app.use(bodyParser.text({ type: 'text/xml' }));
    app.use(bodyParser.text({ type: 'text/plain' }));
};