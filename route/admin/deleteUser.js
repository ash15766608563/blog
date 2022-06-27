const { User } = require('../../model/user');

module.exports = async (req,res)=>{
    //根据用户id查询待删除的用户
    await User.findOneAndDelete({_id:req.query.id});
    //重定向到列表页面
    res.redirect('/admin/user');
}