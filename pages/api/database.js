import { connectToDatabase } from "../../utils/mongo"

export default async (req,res) => {
	const { db } = connectToDatabase()
	db.collection("elite").insert({name:"sol"})
}