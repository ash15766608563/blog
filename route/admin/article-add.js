const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = (req,res)=>{
    //创建表单解析对象
    const form = new formidable.IncomingForm();
    //创建上传目录文件
    form.uploadDir = path.join(__dirname,'../','../','public','upload');
    //上传文件必须保留文件名后缀
    form.keepExtensions = true;
    form.parse(req,async (err,fields,files)=>{
        //fields表示普通文件,files表示上传的二进制文件的相关信息
        console.log(files);
       await Article.create({
            title:fields.title,
            author:fields.author,
            publishDate:fields.publishDate,
            cover:files.cover.filepath.split('public')[1],
            content:fields.content
        }) 

        //数据插入数据库后，跳转到文章列表页面
        res.redirect('/admin/article')
    })
}