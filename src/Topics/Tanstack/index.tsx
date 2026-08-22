import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"


export default function FetchUser() {
    // const [userList, setUserList] = useState([]);
    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch('https://jsonplaceholder.typicode.com/users')
    //         const data = await response.json()
    //         setUserList(data)
    //     }

    //     fetchData();

    // }, [])

    useQuery({
        queryKey: ['userList'],
        q
    })

    console.log(userList)
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: 600,
                gap: '12px',
            }}
        >
            <h2 style={{ margin: 0 }}>User List</h2>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                {userList.map((item: any) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}