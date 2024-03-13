const router = require('express').Router()
const User=require('../Schema/userinfo')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const authMiddleWare = require('../middlewares/authMiddleWare')

router.post('/register',async (req,res)=>{
    try{
    const userinfo= await User.findOne({email:req.body.email})
    if(userinfo){
        return res.send({
            success:false,
            message:"User  Exist!!!"
        })
    }

    const salt= await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(req.body.password,salt)
    req.body.password=hashedPassword
    
    const newUser = new User(req.body)
   await newUser.save()

   res.send({
    success:true,
    message:"Registration Successfull"
   })
}
catch(error){
console.log(error)
}
})

router.post('/login', async (req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return res.send({
            success:false,
            message:"User doesnot exist!!"
        })
        
    }
    const validPassword= await bcrypt.compare(req.body.password,user.password)

    if(!validPassword){
        return res.send({
            success:false,
            message:"Wrong Password"
        })
    }
  const token=jwt.sign({userid:user._id},process.env.jwt_secret,{expiresIn:'1d'})
    res.send({
        success:true,
        message:"Logged in Successfully",
        data:token
    })
})


//get User details by Id

router.get('/get-current-user',authMiddleWare, async(req,res)=>{
    try {
        const user= await User.findById(req.body.userid).select('-password')
        res.send({
            success:true,
            messgae:"User Details Fetched Successfully",
            data:user
        })
    } catch (error) {
        res.send({
           success:false,
           message:error.message
        })
    }

})

module.exports=router