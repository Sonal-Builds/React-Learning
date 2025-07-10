
import { useEffect, useState } from 'react'
import './index.css'

export default function Autocomplete() {
    const [search,setSerch] = useState('');
    const [result, setResult] = useState<any>([])
    const [showResult, setShowResult] = useState(false)
    const [cache, setCache] = useState({})

    useEffect(() => {
        if(cache[search]) {
            setResult(cache[search]);
            return;
        }
        const timer = setTimeout(fetchapi,300)
        
       return () => {
        clearTimeout(timer)
       }
    },[search]);

    async function fetchapi() {
        const response = await fetch('https://dummyjson.com/recipes/search?q='+search);
        const data = await response.json();
        setResult(data?.recipes)
        setCache((pre) => ({...pre,[search]:data?.recipes}))
    }

    const Handleinput = (e:any) => {
        setSerch(e.target.value)
        setShowResult(true)
    }

    console.log(cache)
    return (
        <div className="App">
            <h1>Autocomplete Search Bar</h1>
            <div>
                <input 
                type='text' 
                value={search} 
                className='searchbox'
                onChange={Handleinput}
                onFocus={()=>{setShowResult(true)}}
                onBlur={()=>{setShowResult(false)}}
                />
                </div>
           {showResult && <div className='result-box'>
                {result.map((r:any,index:number) => (
                    <span key={index}className='result'>{`${r.name},`}</span>
                ))}
            
            </div>}
            
        </div>
    )
}