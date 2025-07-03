import { useEffect, useState } from "react";
import list from "../../JSON/FileExplorer.json";




export default function FileExplorer() {


const [data,setData] = useState(list)

const ListObject = ({node}:any) => {
    const [isExpand,setIsExpand] = useState<{[key: string]: boolean}>({})
console.log(node)
return (
    node.map((item:any) => (
        <div className="item">
            {item.children && <span onClick={()=>setIsExpand((prev) => ({...prev,[item.name]:!prev[item.name]}))}>{isExpand[item.name] ? '-':'+'}</span>}
            <span>{item.name}</span>
            {item.children && isExpand[item.name] && <ListObject node={item.children} />}
        </div>
    ))
)
    
}
    return (
        <>
            <h1>File Explorer</h1>
            <ListObject node={data}/>
           
        </>
    )
}