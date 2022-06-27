const {User} = require('../../model/user');

module.exports = async (req,res)=>{
    //activeLink用于判断当前是指向文章页面还是用户列表页面
    req.app.locals.activeLink = 'user';
    //message为错误信息提示
    const {message,id} = req.query;
    console.log(id,message);
    if(id){
        //如果查询参数中有id，那么应该跳转到修改页面，如果没有id，应该跳转到新增页面
        let user = await User.findOne({_id:id});
        res.render('admin/user-edit',{
            message:message,
            user:user,
            link:"/admin/user-modify?id=" + id,
            button:'修改'
        })
    }else {
        res.render('admin/user-edit',{
            message:message,
            link:'/admin/user-edit',
            button:'添加'
    });
    }
}