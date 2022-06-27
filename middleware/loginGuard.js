const guard = (req,res,next)=>{
    //需要跳转到登录页面的情况：路径为/admin/非login，且用户的session.username为空,挂载路径(/admin)并不会出现在req.url中
    if(req.url != '/login' && !req.session.username){
        res.redirect('/admin/login');
    }else {
        //如果用户是普通用户，跳转到博客信息页面，而不是博客管理页面，如果用户是管理员，那么不必跳转，因为路径为/admin开头，只需往下执行即可
        if(req.session.role == 'normal'){
            //使用return可以结束向下执行，也就是不会再调用next()
           return res.redirect('/home/');
        }
        next();
    }
}
module.exports = guard;