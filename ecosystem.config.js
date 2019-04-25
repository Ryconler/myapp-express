module.exports = {
    apps: [{
        name: 'myapp-server',
        script: 'bin/www',
        ignore_watch: ['node_modules'],
        watch: true,
    }, {
        name: 'myapp-game-server',
        script: 'public/games/plane/js/server.js',
        ignore_watch: ['node_modules'],
        watch: true,
    }],
};
