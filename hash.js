const bcrypt = require('bcryptjs');
//生成salt值，参数越大，生成的随机字符串复杂度越高，默认值是10
const salt = bcrypt.genSaltSync(10);
//console.log(salt);
//进行加密,compareSync('明文',salt)
const pass = bcrypt.hashSync('123456',salt);
//console.log(pass);
//密码比对，成功返回true。失败返回false
const isEqual = bcrypt.compareSync('123456',pass);
console.log(isEqual);