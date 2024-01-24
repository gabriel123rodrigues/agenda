const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },

});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }
  async register() {
    this.valida();
    if (this.errors.length > 0) return;
    
    this.UserExistes();

    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

   

      this.user = await LoginModel.create(this.body);
   
  }
  
  async UserExistes(){
    const user = await LoginModel.findOne({ email: this.body.email });
    if(user) this.errors.push( 'usuário já existe' )
  }

  valida() {
    this.cleanUp();
    if (!validator.isEmail(this.body.email)) this.errors.push("email invalido");
    if (this.body.password.length < 5 || this.body.password.length > 15) {
      this.errors.push("a senha precisa ter entre 3 e 15 caracteres")
    }
    console.log(this.errors);

  }
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password,
    }
  }
}

module.exports = Login;
