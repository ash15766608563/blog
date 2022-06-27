module.exports = (req,res)=>{
    //将views/admin中的login.art渲染后，发送给客户端
    res.render('admin/login');
}