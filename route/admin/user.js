//引入数据库User
const { User } = require('../../model/user');

module.exports = async (req,res)=>{
     //req.app为express应用程序的实例
     req.app.locals.activeLink = 'user';
     //获取用户的page查询参数,也就是查询第几页，如果没有传递page，则默认值为1
     const page = req.query.page || 1;
     //每页显示两条数据
     const pageSize = 2;
     //跳过的用户数
     const start = (page - 1) * pageSize;
     //获取数据库的用户总数
     const userCount = await User.countDocuments({});
     //总页数
     let total = Math.ceil(userCount / pageSize);
     //查询当前的用户，user为用户信息的数组
     let user = await User.find({}).limit(pageSize).skip(start);

     res.render('admin/user',{
          user:user,
          //page是字符串格式，应该先转为number类型
          page:Number(page),
          total:total
     }); 
}