import mongoose from "mongoose"
import beacon from "../../models/beacon"

const beacons = async (req, res) => {

	const connectionParams = {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	}
	switch (req.method) {
		case "GET":
			mongoose.connect(process.env.MONGODB_URI, connectionParams).then(async() => {
				
				let result = await beacon.find({})
				res.send(result);
			})
			break;
		case "POST":
			mongoose.connect(process.env.MONGODB_URI, connectionParams).then(async() => {

				beacon.create({name:req.body.beaconName, system:req.body.systemName}).then( async (result) => {
					let beacons = await beacon.find({})
					res.send(beacons);
				})
			})
			break;
	}

}

export default beacons