const Login = require('../models/LoginModel')


exports.index = (req, res)=>{
    console.log('Chegou na função index do controller');
    res.render('login')
}
exports.register = async function (req, res){
    console.log('Chegou na função register do controller');
    const login = new Login(req.body);
    try{
    
    await login.register();

    }catch(e){

    console.log(e);
    if(login.errors.length > 0){
        req.flash("errors", login.errors);
        req.session.save(function (){
            res.redirect('back');
        });
        return 
    }
}

    res.send(login.errors)
}