import mongoose from "mongoose"

export default async (req, res) => {

    const systemSchema = new mongoose.Schema({
		name: String
	})

    const connectionParams = {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	}

    switch (req.method) {
        case "GET":
            mongoose.connect(process.env.MONGODB_URI,connectionParams)
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
            mongoose.connect(process.env.MONGODB_URI,connectionParams)
            .then(async ()=>{
                let system
                try {
                    system = new mongoose.model("System")
                }
                catch(err){
                    system = new mongoose.model("System", systemSchema)
                }
                system.create({name:req.body.systemName}).then(async (result) => {
                    let systems = await system.find({})
                    res.send(systems)
                })
            })
            .catch(err => {
                console.log(err)
            })
        default:
            break;
    }
    
}