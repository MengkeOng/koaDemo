var _request = require('request');

module.exports = {
    index: function*(next){
        yield this.render('index',{"title":"koa demo"});
        yield next
    },
    app: function*(next){
        /*
        * http请求转发
        * */
        /*var options = {
            method: 'POST',
            uri: 'https://example.com',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(this.request.body)
        };
        function sendMsg(options){
            return function(callback){
                _request(options, function(error, response, body){
                    callback(error, response);
                });
            }
        }

        var response = yield sendMsg(options)//HTTP requests with no callbacks!
        var info = JSON.parse(response.body);
        this.body = info;*/

        this.body = {demo: 'test'};
    }
}
