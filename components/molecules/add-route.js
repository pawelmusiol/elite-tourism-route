import { Button } from "../atoms"

export default function addRoute({setRoute, reset, Route}){
    return (
        <>
        <Button onClick={() => setRoute(Route+1)}>Dodaj Drogę</Button>
        <Button onClick={() => reset()}>Reset</Button>
        </>
    )
}