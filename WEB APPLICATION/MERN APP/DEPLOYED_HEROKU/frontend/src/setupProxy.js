/* const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(createProxyMiddleware('/auth/google', 
        { target: 'https://book-min.herokuapp.com/',changeOrigin: true}
    ));
    app.use(createProxyMiddleware('/api/current_user', 
        { target: 'https://book-min.herokuapp.com/' ,changeOrigin: true}
    ));
    app.use(createProxyMiddleware('/api/logout', 
        { target: 'https://book-min.herokuapp.com/',changeOrigin: true }
    ));
}
 */