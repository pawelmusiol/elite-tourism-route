export const getSystems = (systems) => {
    return {
        type: "GET_SYSTEMS",
        systems
    }
}
export const setSystems = () => {
    return {
        type: "SET_SYSTEMS"
    }
}
