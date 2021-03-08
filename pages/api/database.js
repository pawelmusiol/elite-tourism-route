import mongoose from "mongoose"

export default async (req, res) => {

	

	mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
		.then(() => {
			let system
			
			const inputSystem = new system({ name: "Sol" })
			console.log(inputSystem.name)

			inputSystem.save((err, data) => {
				if (err) throw err;
			})
		})
		.catch((err) => {
			console.error(`Error connecting to the database. \n${err}`);
		})
	res.send({ message: "dupa" })
}