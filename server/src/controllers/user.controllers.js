
const User = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async(req , res )=>{
    try {
        const {username,email,password} = req.body;
        let user = await User.findOne({email})

        if(user){
            res.status(400).send({
                message : 'User already registered, please log in'
            })
        }
        const hashedPassword = bcrypt.hashSync(password,10);
        console.log(hashedPassword);
         
         user = await User.create({
            username,
            email,
            password : hashedPassword
        })
        res.status(200).send({
            message : 'Registered successfully',
            user,
        })
    } catch (error) {
        res.status(400).send({
            message : 'something went wrong'
        })        
    }
}


const login = async(req,res)=>{
    try {

        const {email, password}=req.body ;

        let user = await User.findOne({email})

        if(!user)
            res.status(400).send({
                message : "User not found, Please Signup"
            })
        const match = bcrypt.compareSync(password,user.password)

        if(!match)
            res.status(400).send({
                message : 'Invalid credentials'
        })

        const Token = jwt.sign(user.email,"secretKey")
        
        res.status(200).send({
            message : 'Logging Successfully', Token
        })

        
    } catch (error) {
        res.status(400).send({
            message : 'something went wrong' , err
        })
    }
}

module.exports = {register,login};