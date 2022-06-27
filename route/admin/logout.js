module.exports = (req,res)=>{
    req.session.destroy(function(){
        //删除cookie
        res.clearCookie('connect.sid');
        //清除模板中的用户信息，让userInfo为空
        req.app.locals.userInfo = null;
        //重定向到登录页面
        res.redirect('/admin/login');
    })
}