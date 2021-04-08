import mongoose from 'mongoose'

const errorSchema = new mongoose.Schema({
	desc: String,
	date: Date,
})

export default mongoose.models.Error || mongoose.model('Error', errorSchema)