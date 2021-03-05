import mongoose from "mongoose"

export default async (req, res) => {

    const systemSchema = new mongoose.Schema({
		name: String
	})

    switch (req.method) {
        case "GET":
            mongoose.connect(process.env.MONGODB_URI,process.env.CONN_PARAMS)
            .then(async ()=>{
                let system
                try {
                    system = new mongoose.model("System")
                }
                catch(err){
                    system = new mongoose.model("System", systemSchema)
                }
                let result = await system.find({})
                res.send(result)
            })
            .catch(err => {
                console.log(err)
            })
            break;
        case "POST":

        default:
            break;
    }
    
}