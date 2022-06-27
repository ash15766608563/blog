const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');

module.exports = async (req,res,next)=>{
    const id = req.query.id;
    //解析修改后用户的相关信息
    const { password, email, username, state,role } = req.body;
    //查询用户
    let user = await User.findOne({_id:id});
    //修改时必须保证email地址不能被占用,注意用户可能没有修改email，所以先判断用户有没有修改email
    if(email != user.email){
        //用户修改了email，此时比较修改后的email是否在数据库中已经存在，存在则不能修改
        let userCheck = User.findOne({email:email})
        if (userCheck){
            let obj = {path:'/admin/user-edit',message:'邮箱地址已经被占用',id:id};
            return next(JSON.stringify(obj));
        }
    }
    //用户的密码是不允许修改的，先判断密码是否修改，如果修改，则更新失败
    const isValid = bcrypt.compareSync(password,user.password);
    if (isValid){
        await User.updateOne({_id:id},{
            email:email,
            username:username,
            state:state,
            role:role
        })
        res.redirect('/admin/user');
    }else {
        // 传入id参数，这是因为id区分新增页面还是修改页面
        let obj = {path:'/admin/user-edit',message:'密码比对失败,不能修改用户信息',id:id}
        return next(JSON.stringify(obj));
    }

}