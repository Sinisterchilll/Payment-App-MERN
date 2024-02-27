const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://anucbs22:Ayushmongodb@cluster0.jdlhsad.mongodb.net/')
const userSchema = new mongoose.Schema({
    username:String,
    passward:String,
    firstName:String,
    lastName:String
})

const accountSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    balance:Number
})

const User = mongoose.model('User' , userSchema)
const Account = mongoose.model('Account' , accountSchema)

module.exports = {
    User , Account
}