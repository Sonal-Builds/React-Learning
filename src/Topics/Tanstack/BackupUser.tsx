import { useQueryClient } from "@tanstack/react-query"


export default function BackupUser() {

    const query = useQueryClient()
    const BackUpUsers = query.getQueryData<[]>(["userList"]) ?? [];

    console.log("BackUp:,BackUpUsers")
    return(
        <>
            <h2>BackUp Users</h2>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                {BackUpUsers.map((item: any) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </>
    )
}