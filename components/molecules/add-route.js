import { MoreButton } from "../atoms"

export default function addRoute({setRoute,Route}){
    return (
        <MoreButton onClick={() => setRoute(Route+1)}>Dodaj Drogę</MoreButton>
    )
}