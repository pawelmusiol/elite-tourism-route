const systemsReducer = (state=[{}], action) => {
    switch (action.type) {
        case "GET_SYSTEMS":
                return [...action.systems]
            break;
    
        default:
            return state
            break;
    }
}

export default systemsReducer