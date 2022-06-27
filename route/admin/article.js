const { Article } = require('../../model/article');
//导入数据库分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req,res)=>{
    req.app.locals.activeLink = 'article';
    const page = req.query.page;
    //page指定当前页，size指定每页条数，display指定客户端要显示的页码数量，返回一个对象，对象的records是一个数组，
    //记录查询信息，对象的pages属性为总条数，对象的page为当前页的页码
    let tmp_article = await pagination(Article).find({}).page(page).size(2).display(3).populate('author').exec();
    //将tmp_article对象转为普通对象
    let str = JSON.stringify(tmp_article);
    let article = JSON.parse(str);
    res.render('admin/article',{
        article:article
    })
}