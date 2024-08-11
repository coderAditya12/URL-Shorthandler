const User = require("../model/user")
const handle = async(req,res)=>{
    const {email,name,password} = req.body;
    await User.create({
        name,
        email,
        password,
    })

    return res.render('/')
}
const handleLogin= async(req,res)=>{
    const {email,password} = req.body;
    const valid = await User.findOne({email,password});

    if(!valid) return res.render("login",{
        error:"Invalid email or password"
    })
 
    return res.redirect('/')
}

module.exports ={
    handle,handleLogin
}