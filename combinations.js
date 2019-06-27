'use strict';

module.exports = function combinations(x,w) {

    var n = w.match(/\!/g).length,
        x_n = new Array(),
        r = new Array(),
        c = null;

    for (var i = n; i > 0; i--) {
        x_n.push(x);
    }

    c = x_n.reduce(function(a, b) {
        var c = [];
        a.forEach(function(a) {
            b.forEach(function(b) {
                c.push(a.concat([b]));
            });
        });
        return c;
    }, [[]]);

    for (var i = 0, j = 0; i < c.length; i++, j = 0) {
        r.push(w.replace(/\!/g, function(s, k) {
            return c[i][j++];
        }));
    }

    return r;
}
