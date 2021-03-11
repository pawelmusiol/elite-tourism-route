export const getBeacons = (beacons) => {
    return {
        type: "GET_BEACONS",
        beacons
    }
}
export const setBeacons = () => {
    return {
        type: "SET_BEACONS"
    }
}
