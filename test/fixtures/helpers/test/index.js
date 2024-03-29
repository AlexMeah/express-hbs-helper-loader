module.exports = function (hbs) {
    hbs.registerHelper('link', function (text, options) {
        var attrs = [];
        for (var prop in options.hash) {
            attrs.push(prop + '="' + options.hash[prop] + '"');
        }
        return new hbs.SafeString(
            '<a ' + attrs.join(' ') + '>' + text + '</a>'
        );
    });
}