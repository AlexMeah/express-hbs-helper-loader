var fs = require('fs');
var path = require('path');
var glob = require('glob');
var debug = require('debug')('express-hbs-helper-loader');

module.exports = function (hbs, location) {

    function tooDeep(file) {
        return file.split(path.sep).length > 2;
    }

    function register(file) {
        debug('Registering ' + path.join(location, file));
        require(path.join(location, file))(hbs);
    }

    if (typeof hbs === 'string') {
        throw new Error('Please pass in a express-hbs instance as the first argument');
    }

    location = path.resolve(location);

    if (!fs.existsSync(location)) {
        throw new Error('Sorry, I\'m not sure where that folder is...');
    }

    glob(path.join('*/index.js'), {
        cwd: location,
        dot: false,
        sync: true // Stop express race condition on start up
    }, function (err, files) {
        if (err) throw err;

        files.forEach(function (file) {
            if (tooDeep(file)) {
                return console.warn(file, 'not registered, only folders 1 level deep are supported.');
            }

            register(file);
        });
    });
};