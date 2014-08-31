module.exports = function (hbs) {
    hbs.registerAsyncHelper('readFile', function (filename, cb) {
        setTimeout(function () {
            cb(new hbs.SafeString(filename + '. I like test'));
        }, 100);
    });
}