// CHACING MECHANISM
var r         = require("request").defaults({ json:true })
var config    = require("../config/config");
var redisurl  = config.redisurl;
var redisport = config.redisport;
var async     = require("async");
var redis     = require("redis");
var password  = config.password
client    = redis.createClient({
    port      : redisport,               // replace with your port
    host      : redisurl,                // replace with your hostanme or IP address
    password  : password
})    

module.exports = function(app) {

    /* Read */
    app.get('/pets', function (req, res) {

        async.parallel({
            cat: function(callback){
                r({uri: 'http://localhost:3000/cats'}, function(error, response, body) {
                    if (error) {
                        callback({service: 'cat', error: error});
                        return;
                    };
                    if (!error && response.statusCode === 200) {
                        callback(null, body.data);
                    } else {
                        callback(response.statusCode);
                    }
                });
            },
            dog: function(callback){

                client.get('http://localhost:3001/dogs', function(error, dog) {
                    if (error) {throw error;};
                    if (dog) {
                        callback(null, JSON.parse(dog));
                    } else {

                        r({uri: 'http://localhost:3001/dogs'}, function(error, response, body) {
                            if (error) {
                                callback({service: 'dog', error: error});
                                return;
                            };
                            if (!error && response.statusCode === 200) {
                                callback(null, body.data);
                                // client.set('http://localhost:3001/dog', JSON.stringify(body.data), function (error) {
                                client.setex('http://localhost:3001/dogs', 10, JSON.stringify(body.data), function (error) {
                                    if (error) {throw error;};
                                });
                            } else {
                                callback(response.statusCode);
                            }
                        });

                    }
                });

            }
        },
        function(error, results) {
            res.json({
                error: error,
                results: results
            });
        });

    });

    app.get('/ping', function (req, res) {
        res.json({pong: Date.now()});
    });

};