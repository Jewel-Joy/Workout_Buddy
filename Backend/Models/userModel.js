const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const validator=require('validator');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

}
)

userSchema.statics.signup=async function(email,password){

    if(!email||!password){
        throw Error('Please provide email and password');
    }
    if(!validator.isEmail(email)){
        throw Error('Please provide a valid email');
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password should be strong');
    }
    const exists=await this.findOne({email});
    if(exists){
        throw new Error('User already exists');
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const user=await this.create({email,password:hashedPassword});

    return user;
}

userSchema.statics.login=async function(email,password){
    if(!email||!password){
        throw Error('Please provide email and password');
    }
    const user=await this.findOne({email});
    if(!user){
        throw new Error('Invalid Email');
    }
    const match=await bcrypt.compare(password,user.password);
    if(!match){
        throw new Error('Invalid Password');
    }
    return user;

}

module.exports=mongoose.model('User',userSchema);