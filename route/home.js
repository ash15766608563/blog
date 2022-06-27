const express = require('express');
const home = express.Router();
//文章列表首页
home.get('/',require('./home/index'));
//文章详情页
home.get('/article',require('./home/article'));
//获取文章评论
home.post('/comment',require('./home/comment'));
module.exports = home;