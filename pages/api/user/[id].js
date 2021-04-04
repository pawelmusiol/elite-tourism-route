import mongoose from "mongoose"
import { decodeToken } from "./login"
import beacon from "../../../models/beacon"
import system from "../../../models/system"
import user from "../../../models/user"

const UserId = async (req, res) => {

	const connectionParams = {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	}

	switch (req.method) {
		case "GET":
			mongoose.connect(process.env.MONGODB_URI, connectionParams).then(async () => {
				user.findById(req.query.id).select(' -password').then(async (user) => {
					if (user) {
						let beacons = await beacon.find({ userId: req.query.id })
						let systems = await system.find({ userId: req.query.id })
						res.status(200).send({ success: true, user:user, beacons: beacons, systems: systems })
					}
					else {
						res.status(404).send({ success: false, message: "Nie znaleziono takiego użytkownika"})
					}
				})
			})
			break;
		default:
			break;
	}
}

export default UserId