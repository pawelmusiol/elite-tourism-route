import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    login: String,
    password: String,
	name: String,
    registerDate:String,
    lastActive: String
})

export default mongoose.models.User || mongoose.model('User', userSchema)