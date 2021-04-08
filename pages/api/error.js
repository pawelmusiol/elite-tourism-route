import mongoose from "mongoose"
import error from "../../models/error"

const errorReport = async (req, res) => {

	const connectionParams = {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	}
	switch (req.method) {
		case "POST":
			mongoose.connect(process.env.MONGODB_URI, connectionParams)
				.then(async () => {
					let result = await error.create({ desc: req.body.desc, date: Date.now() })
					res.send(result)
				})
	}
}

export default errorReport