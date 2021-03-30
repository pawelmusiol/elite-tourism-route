export const getUser = (user) => {
	return {
		type: "GET_USER",
		user
	}
}

export const setUser = () => {
	return {
		type: "SET_USER"
	}
}