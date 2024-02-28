const express = require('express')
const router = express.Router()
const zod = require('zod')
const {User , Account} = require('../database/db')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config')
const {authMiddleware} = require('../middleware')

const signupBody = zod.object({
    username: zod.string().email(),
    passward: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post('/signup' , async(req,res)=>{
    const {success} = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            error:'email already in use/invalid input'
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            error:'email already in use/invalid inputs'
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId = user._id

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET)

    res.json({
        message:'user created',
        token: token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
    passward: zod.string()
})

router.post('/signin' , async (req,res)=>{
    const {success} = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:'invalid inputs'
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }
})


const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})

module.exports = router
