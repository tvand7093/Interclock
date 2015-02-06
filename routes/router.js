var stations = require('./station');

module.exports.use = function(app){
    app.get('/search/:search', stations.search);
    app.get('/play/:id', stations.play);
    app.get('/stop', stations.stop);

}
