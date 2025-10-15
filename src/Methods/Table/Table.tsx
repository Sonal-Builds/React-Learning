// import axios from "axios";
import {useEffect, useState} from "react";
import axios from "axios";
import UseFetch from "./useFetch";
// import axios from "axios";


type User= {
    id:number;
    name:string;
    username:string;
    phone:string
}

export default function Table() {

    // const [user,setUser] = useState<User[]>([])
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState<string | null>(null)

    // async function  fetchUser() {
    //     const response = await fetch("https://jsonplaceholder.typicode.com/users")
    //     const data = await response.json()
    //     setUser(data)
        
    // }

    // async function fetchUser() {
    //     try {
    //         setLoading(true)
    //         const response = await fetch("https://jsonplaceholder.typicode.com/users")
    //         console.log(response)
    //         if(!response.ok) throw new Error('User not Fetched')
    //         const data = await response.json();
    //         setUser(data)
    //     } catch(error : any) {
    //         setError(error.message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // const fetchUser = async (): Promise<void> => {
    //     try {
    //         const response = await axios.get("https://jsonplaceholder.typicode.com/users")
    //         console.log(response)
    //         // if(!response.ok) throw new Error("Fetching User Failed")
    //         setUser(response.data)
    //     } catch(err:any) {
    //         setError(err.message)
    //     } finally {
    //         setLoading(false)
    //     }
    // }



    // useEffect(()=>{
    //     fetchUser()
    // },[])

    const {data:user, loading, error} = UseFetch<User[]>("https://jsonplaceholder.typicode.com/users")

    console.log(user)
    if(loading) return <p>Loading User....</p>
    if(error) return <p style={{color:"red"}}>Loading User Failed</p>
    return(
        <div style={{width:'500px'}}>
            <h1>Table</h1>
            <table style={{width:"100%"}} border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>UserName</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                    <tbody>
                {
                    user.map((item,index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.username}</td>
                                <td>{item.phone}</td>
                            </tr>
                    ))
                }
                        </tbody>
            </table>
        
        </div>
    )
}