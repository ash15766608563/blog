//引入morgan模块
const morgan = require('morgan');
//引入express模块
const express = require('express');
//引入session模块
const session = require('express-session');
//引入日期处理模块
const dateformat = require('dateformat');
//导入art-template模块
const template = require('art-template');
//向模板内部导入dateformat变量
template.defaults.imports.dateformat = dateformat;
//引入path模块
const path = require('path');
//引入数据库连接模块
require('./model/connect');
require('./model/user');
//创建网站服务器
const app = express();
//导入config模块,config会读取对应环境的配置信息
const config = require('config');
//console.log(config.title);

if(process.env.NODE_ENV == 'development'){
    //开发环境
    //console.log('开发环境');
    //将客户端发送到服务器的信息打印到控制台中
    //app.use(morgan('dev'));
}else{
    //生产环境
    console.log('生产环境');
}

//配置post请求，可以识别url-encoded类型的post请求
app.use(express.urlencoded({extended:false}));

//配置session
app.use(session({
    'secret':'12345',//签名，必备字段，可任意
    resave:false,//强制存储session
    saveUninitialized: false,//用户未登录时，不要给用户一个默认的cookie
    cookie:{
        maxAge:24 * 60 * 60 * 1000 //设置cookie的过期时间
    }
}));

//设置模板路径
app.set('views',path.join(__dirname,'views'))
//设置模板默认后缀
app.set('view engine','art');
//当模板后缀为art时，使用的模板引擎，也就是注册模板引擎
app.engine('art',require('express-art-template'));

//开放静态资源
app.use(express.static(path.join(__dirname,'public')));

//当路径为/admin/xxx时，检查用户是否已经登录
app.use('/admin',require('./middleware/loginGuard'));

//引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

//为路由对象匹配一级路由
app.use('/home',home);
app.use('/admin',admin);

//创建错误处理中间件，用来捕获用户登录失败的页面跳转,err为next的参数
app.use((err,req,res,next)=>{
    //JSON.parse()可以将字符串转为对象
    result = JSON.parse(err);
    let params = [];
    for (let attr in result){
        if (attr != 'path'){
            params.push(attr + '=' + result[attr]);
        }
    }
    return res.redirect(`${result.path}?+${params.join('&')}`);
});

//监听80窗口
app.listen(80);
console.log('服务器启动成功!');