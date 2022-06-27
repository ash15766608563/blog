//导入用户的集合模块，方便比对用户信息，决定是否成功登录
const {User} = require('../../model/user');
//导入数据加密模块
const bcrypt = require('bcryptjs');

module.exports = async(req,res)=>{
    //获取用户登录信息，即邮箱和密码
    let {email,password} = req.body;
    if(email.trim().length == 0 || password.trim().length == 0){
        res.status(400).render('admin/error',{msg:'用户名或者密码错误!'});
        return;
    }
    //根据email来查询用户，如果查询到用户，则返回一个对象，对象为该用户信息，否则返回null
    let user = await User.findOne({email});
    if(user){
        let isEqual = bcrypt.compareSync(password,user.password);
        //用户名和密码正确
        if(isEqual){
            //为未初始化的session配置set-cookie，并发给客户端
            req.session.username = user.username;
            req.session.role = user.role;
            //将用户信息开放出去
            res.app.locals.userInfo = user;
            //如果用户是超级管理员，跳转到管理页面
           if(user.role == 'admin'){
                res.redirect('/admin/user');
           }else {
               //如果不是管理员，跳转到博客信息页面
               res.redirect('/home/');
           }
        }else {
            //用户名存在，但是密码不正确
            res.status(400).render('admin/error',{msg:'用户名或者密码错误!'});
        }
    }else {
        //用户名不存在
            res.status(400).render('admin/error',{msg:'用户名或者密码错误!'});
        }
}
