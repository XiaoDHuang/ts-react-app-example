const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    //     target: 'http://localhost:4000',
    //     pathRewrite(path) {
    //         return path.replace('/api', '/').replace('.action', '.json');
    //     }
    // }));

    app.use(proxy('/api', {
        target: 'http://localhost:4000',
        pathRewrite(path) {
            return path.replace('/api', '/');
        }
    }))
};
