import mongoose from "mongoose"

export default async (req, res) => {

	const beaconSchema = new mongoose.Schema({
		system: String,
		name: String
	})

	const connectionParams = {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	}
	switch (req.method) {
		case "GET":
			mongoose.connect(process.env.MONGODB_URI, connectionParams).then(async() => {
				let beacon
                try {
                    beacon = new mongoose.model("Beacon")
                }
                catch(err){
                    beacon = new mongoose.model("Beacon", beaconSchema)
                }
				let result = await beacon.find({})
				res.send(result);
			})
			break;
		case "POST":
			mongoose.connect(process.env.MONGODB_URI, connectionParams).then(async() => {
				let beacon
                try {
                    beacon = new mongoose.model("Beacon")
                }
                catch(err){
                    beacon = new mongoose.model("Beacon", beaconSchema)
                }
				beacon.create({name:req.body.name, system:req.body.system}).then( async (result) => {
					let beacons = await beacon.find({})
					res.send(beacons);
				})
			})
			break;
	}

}