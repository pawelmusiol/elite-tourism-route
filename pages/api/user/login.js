import mongoose from "mongoose"
import user from "../../../models/user"

export default async (req, res) => {
    const connectionParams = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
    switch (req.method) {
        case "POST":
            mongoose.connect(process.env.MONGODB_URI, connectionParams).then(async () => {
                let result = await user.find(req.body)
                if (!result.length) {
                    res.status(401).send({success:false})
                }
                else {
                    res.status(200).send({success:true, result:result})
                }
            })
            break;

        default:
            break;
    }
}