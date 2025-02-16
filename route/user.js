const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
//update user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin){
        if (req.body.password){
            try{
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }catch(err){
                return res.status(500).json(err)
            }
        } 
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body})
            res.status(200).json("account has been updated")
        }catch(err){
            res.status(500).json(err)
        }
    }else {
        return res.status(403).json('You are not admin')
    }
})

module.exports = router