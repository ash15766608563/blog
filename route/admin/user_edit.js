const bcrypt = require('bcryptjs');

const {User,validateUser} = require('../../model/user');
module.exports = async(req,res,next)=>{
    try {
        await validateUser(req.body);
    }catch(e){
        //验证失败，则重定向回页面，将错误信息作为查询字符串，使用next()调用错误处理中间件
       //JSON.stringify()可以将对象转为字符串
       return next(JSON.stringify({path:'/admin/user-edit',message:e.message}))
    }
    //判断用户邮箱是否已经注册，如果查询到，则返回user对象，否则返回值为空
    const user = await User.findOne({email:req.body.email})
    if(user) {
        //响应给客户端，邮箱已经被注册
        //return res.redirect('/admin/user-edit?message=邮箱地址被占用');
        return next(JSON.stringify({path:'/admin/user-edit',message:'邮箱地址被占用'}))
    }
    //对密码进行加密
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(req.body.password,salt);
    req.body.password = password;
    await User.create(req.body);
    res.redirect('/admin/user'); 
}