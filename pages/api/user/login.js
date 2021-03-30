import mongoose from "mongoose"
import jwt from "jsonwebtoken"
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
                    let token = await signToken(result[0]._id, 1000 * 60)
                    res.status(200).send({success:true, user:result[0], token: token })
                }
            })
            break;
        case "GET":
            mongoose.connect(process.env.MONGODB_URI, connectionParams).then(async () => {
                let id = await decodeToken(req.headers.authorization)
                let result = await user.find({id: id})
                res.status(200).send({success:true, user:result[0]})
            })
        default:
            break;
    }
}

const signToken = async (id, time) => {
    return jwt.sign({id:id.toString() },'dupa', {expiresIn: time})
}

const decodeToken = async (token) => {
    jwt.verify(token, 'dupa',(err, decoded) => {
    })
}