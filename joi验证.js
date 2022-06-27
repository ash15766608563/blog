const Joi = require('joi');
const schema = Joi.object({
    username:Joi.string().min(2).max(12).required()
})
async function run(){
    try{
        schema.validate({'usename':'234'});
        
    }catch(err){
        console.log(err.message);
        return;
    }
    console.log('验证成功')
} 
run();