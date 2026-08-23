import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import BackupUser from "./BackupUser"


export default function FetchUser() {
    const [click, setClick] = useState(false)
    // const [userList, setUserList] = useState([]);
    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch('https://jsonplaceholder.typicode.com/users')
    //         const data = await response.json()
    //         setUserList(data)
    //     }

    //     fetchData();

    // }, [])

    const {data: userList = [], isLoading, isSuccess, error, isError} = useQuery({
        queryKey: ['userList'],
        queryFn: async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users")
            return response.json();
        },
        enabled: click
    })

    console.log(userList,isLoading, isSuccess, error, isError)
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
            <button onClick={() => setClick(!click)}>Fetch User</button>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                {userList.map((item: any) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <BackupUser />
        </div>
    )
}