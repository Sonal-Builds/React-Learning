import { useContext } from "react";
import {userName} from "../App"


export default function UseContextHook() {

    const name = useContext(userName)

    return (
        <div>
            <h1>The User name is {name}</h1>
        </div>
    )
}