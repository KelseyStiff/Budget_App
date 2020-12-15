//proxy requests from client to server for local development
module.exports = {
    devServer: {
        proxy: 'http://127.0.0.1:3000'
    }
}