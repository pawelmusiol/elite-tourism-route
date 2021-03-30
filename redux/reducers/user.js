const userReducer = (state={}, action) => {
    switch (action.type) {
        case "GET_USER":
                return action.user
            break;
    
        default:
            return state
            break;
    }
}

export default userReducer