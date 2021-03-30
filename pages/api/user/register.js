import mongoose from "mongoose"
//import User from "../../../models/User"

export default async (req, res) => {
    const connectionParams = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
    switch (req.method) {
        case "POST":
            mongoose.connect(process.env.MONGODB_URI, connectionParams).then(async () => {
                let userData = req.body

                let User = mongoose.models.User

                let mailCheck = await User.find({mail: userData.mail})
                if(mailCheck.length) res.status(409).send({success:false, error: "Email znajduje się w bazie danych"})

                let loginCheck = await User.find({login: userData.login})
                if(loginCheck.length) res.status(409).send({success:false, error: "Email znajduje się w bazie danych"})

                else{
                    let date = new Date()
                    User.create({
                        login: userData.login,
                        password: userData.password,
                        mail: userData.mail,
                        name: userData.name,
                        registerDate: date,
                        lastActive: date
                    }).then((result) => {
                        
                        res.status(200).send({success:true, result:result})
                    })
                }
            })
            break;
    }
}