var debug = require('debug')('koaDemo');
var koa = require('koa');
var cors = require('koa-cors');
var http = require('http');
var https = require('https');

//配置文件
var config = require('./config/config');

var app = koa();
app.use(cors());
app.use(function *(next){
    //config 注入中间件，方便调用配置信息
    if(!this.config){
        this.config = config;
    }
    yield next;
});

//log记录
var Logger = require('mini-logger');
var logger = Logger({
    dir: config.logDir,
    format: 'YYYY-MM-DD-[{category}][.log]'
});

//router use : this.logger.error(new Error(''))
app.context.logger = logger;

var onerror = require('koa-onerror');
onerror(app);

//xtemplate对koa的适配
var xtplApp = require('xtpl/lib/koa');
//xtemplate模板渲染
xtplApp(app,{
    //配置模板目录
    views: config.viewDir
});




var session = require('koa-session');
app.use(session(app));


//post body 解析
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());
//数据校验
var validator = require('koa-validator');
app.use(validator());


//静态文件cache
var staticCache = require('koa-static-cache');
var staticDir = config.staticDir;
var convert = require('koa-convert');
var static = require('koa-static');
app.use(static(staticDir));
app.use(staticCache(staticDir+'/js'));
app.use(staticCache(staticDir+'/css'));

//路由
var router = require('koa-router');
app.use(router(app));

/*var fs = require('fs');
var options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
}*/
//应用路由
var appRouter = require('./router/index');
appRouter(app);

app.listen(config.port);
//http.createServer(app.callback()).listen(config.port);
//https.createServer(options, app.callback()).listen(443);
console.log('listening on port %s',config.port);

module.exports = app;

