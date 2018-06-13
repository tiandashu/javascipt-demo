
var head = require('./head');
var foot = require('./foot');


console.log('body loading ...');
exports.create = function () {
    return {
        body: 'body',
        foot:foot.create().name,
        head:head.create().name,
    };
};