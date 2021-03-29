import mongoose from 'mongoose';

const systemSchema = new mongoose.Schema({
	name: String
})

export default mongoose.models.System || mongoose.model('System', systemSchema)