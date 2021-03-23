import { Button } from "../atoms"

export default function addRoute({setRoute,Route}){
    return (
        <Button onClick={() => setRoute(Route+1)}>Dodaj Drogę</Button>
    )
}