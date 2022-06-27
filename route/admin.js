const express = require('express');
const admin = express.Router();
//用户登录页面
admin.get('/login',require('./admin/login'));
//获取用户登录信息，根据用户输入的邮箱和密码决定是否登录成功
admin.post('/login',require('./admin/loginTest'));
//显示所有用户列表页面
admin.get('/user',require('./admin/user'));
//用户信息新增页面或者修改页面
admin.get('/user-edit',require('./admin/user-edit'));
//根据用户id删除对应的用户
admin.get('/delete',require('./admin/deleteUser'));

admin.get('/article',require('./admin/article'));
admin.get('/article-edit',require('./admin/article-edit'));
admin.post('/article-add',require('./admin/article-add'));

//获取用户修改信息
admin.post('/user-modify',require('./admin/modify'));
//获取新增用户信息
admin.post('/user-edit',require('./admin/user_edit'))
//退出登录功能
admin.get('/logout',require('./admin/logout'));
module.exports = admin;