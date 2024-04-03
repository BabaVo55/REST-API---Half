const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
    
    try{
        //Hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        //Generate new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        
        //Save new user
        const user = await newUser.save()
        res.status(200).json(user)


    }catch(err){
        res.status(500).json(err)
    }
})


//Login

router.post('/login', async (req, res) => {

    try{

        const validEmail = await User.findOne({email: req.body.email})
        !validEmail && res.status(404).json("email not found")
        
        const validPassword = await bcrypt.compare(req.body.password, validEmail.password)
        !validPassword && res.status(400).json("password incorrect")

        res.status(200).json("welcome back!!!")

    }catch(err){
        console.log(err)
    }
})
module.exports = router