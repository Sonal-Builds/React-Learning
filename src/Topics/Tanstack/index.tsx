import { useState } from "react"
import BackupUser from "./BackupUser"
import { useUsersQuery } from "../../hooks/useUsersQuery"


export default function FetchUser() {
    const [click, setClick] = useState(false)
    const { data: userList = [], isLoading, isSuccess, error, isError } = useUsersQuery(click)

    console.log(userList, isLoading, isSuccess, error, isError)
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
            <button onClick={() => setClick(true)} disabled={isLoading}>Fetch User</button>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                {userList.map((item: any) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <BackupUser />
        </div>
    )
}