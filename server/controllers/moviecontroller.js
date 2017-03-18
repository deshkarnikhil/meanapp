/**
 * Created by nikhiladeshkar on 6/14/15.
 */

var restful = require('node-restful');


module.exports = function(app, route) {

    // Setup the controller for REST.
    var rest = restful.model(
        'movie',
        app.models.movie
    ).methods(['get', 'put', 'post', 'delete']);

    // Register this endpoint with the application.
    rest.register(app, route);

    // Return middleware.
    return function(req, res, next) {
        next();
    };
};