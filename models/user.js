import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    login: String,
    password: String,
    mail: String,
    name: String,
    registerDate:Date,
    lastActive: Date
})

export default mongoose.models.User ||  mongoose.model('User', userSchema)