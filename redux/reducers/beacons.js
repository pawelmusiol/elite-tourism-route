const beaconsReducer = (state=[{}], action) => {
    switch (action.type) {
        case "GET_BEACONS":
                return [...action.beacons]
            break;
    
        default:
            return state
            break;
    }
}

export default beaconsReducer