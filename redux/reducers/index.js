import systems from "./systems"
import beacons from "./beacons"
import user from "./user"
import { combineReducers } from "redux"

export default combineReducers({
    systems,
    beacons,
    user
})
