import { useRouteError } from "react-router-dom";

//console.log({useRouteError});

const Error=()=>{

    const err= useRouteError();
console.log(err);
    return(
        <>
        <h1>OOps!!!!</h1>
        <h1>something went wrong</h1>
        <h2>{err.status}:{err.statusText}</h2>
        </>
    );
}

export default Error;