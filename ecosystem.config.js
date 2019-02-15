module.exports = {
    apps: [{
        name: 'myapp-server',
        script: 'bin/www',
        autorestart: true,
        watch: true,
    }, {
        name: 'myapp-game-server',
        script: 'public/games/plane/js/server.js',
        autorestart: true,
        watch: true,
    }],
};
