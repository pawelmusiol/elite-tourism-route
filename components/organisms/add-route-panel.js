import {AddRoute} from "../molecules"

export default function addRoutePanel({Routes, reset, setRoutes}){    
    return (
        <div id="routes-count">
            <p>{Routes} {RoutesText(Routes)}</p>
            <AddRoute Route={Routes} reset={reset} setRoute={setRoutes} />
            <style jsx>{`
                #routes-count {
                    display: inline-flex;
                    padding: 20px 0 ;
                }
                p {
                    margin:0 10px;
                }

                `}</style>
        </div>
    )
}

const RoutesText = (Routes) =>{
    let routesText = ""
    let Modul = Routes % 10
    if (Routes === 1 ) {
        routesText = "droga"
    }
    else if(Routes > 10 && Routes < 20) {
        routesText = "dróg"
    }
    else if (Modul === 0 || Modul === 1 || Modul === 5 || Modul === 6 || Modul === 7 || Modul === 8 || Modul === 9) {
        routesText = "dróg"
    }
    else if( Modul === 2 || Modul === 3 || Modul === 4) {
        routesText = "drogi"
    }
    return routesText
}