import { useState } from "react"


const UseStateHook = () => {

    const [count, setCount] = useState(0)

    return(
       <div>
        <h1>Counter</h1>
        <span onClick={() => {setCount((prev) => prev+1), console.log(count)}}>+</span><h1>{count}</h1><span onClick={() => setCount(count-1)}>+</span>
       </div>
    )
}

export default UseStateHook