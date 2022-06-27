const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');

module.exports = async (req,res) =>{
    //id为文章的id
    let id = req.query.id;
    //根据id查询具体文章
    let article = await Article.findOne({_id:id}).lean().populate('author');
    //根据文章的id查询Comment数据库中的对应评论
    let comment = await Comment.find({aid:id}).lean().populate('uid');
    res.render('home/article',{
        article:article,
        comment:comment
    }) 
}