import { MongoClient } from 'mongodb'

const client = new MongoClient("mongodb+srv://admin:123321@testing.cscc5.mongodb.net/<dbname>?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

const database = async (req, res) => {
	if (!client.isConnected()) await client.connect()
	req.dbClient = client
	req.db = client.db("Testing")
}

export default database