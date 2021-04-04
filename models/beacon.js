import mongoose from 'mongoose'

const beaconSchema = new mongoose.Schema({
	system: String,
	name: String,
	userId: String
})

export default mongoose.models.Beacon || mongoose.model('Beacon', beaconSchema)