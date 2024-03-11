require('./App/Main.js');

const { Service } = require('node-windows');
const path = require('path');

const svc = new Service({
    name: 'ChatBot',
    description: 'ChatBot para auto atendimento',
    script: path.join(__dirname, 'App.js')
});

svc.on('install', function(){
    svc.start();
});

svc.install();
