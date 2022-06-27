const { Article } = require('../../model/article');
//导入数据分页模块
const pagination = require('mongoose-sex-page');
module.exports = async (req,res)=>{
    let page = req.query.page;
    const tmp = await pagination(Article).find().page(page).size(2).display(2).populate('author').exec();
    const str = JSON.stringify(tmp);
    const article = JSON.parse(str);
     res.render('home/default',{
        article:article
    }) 
}