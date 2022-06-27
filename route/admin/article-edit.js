module.exports = (req,res)=>{
    req.app.locals.activeLink = "article";
    res.render('admin/article-edit');
}