const decodeToken = async (token) => {
    jwt.verify(token, 'dupa',(err, decoded) => {
        console.log(decoded.id)
    })
}

export default async (req, res) => {
	switch (req.method) {
		case 'POST':
			console.log(req.headers.authorization)
			break;
	}
}