import { useQuery } from "@tanstack/react-query"

export type User = {
    id: number
    name: string
    email: string
}

const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")

    if (!response.ok) {
        throw new Error("Failed to fetch users")
    }

    return response.json()
}

export function useUsersQuery(enabled = true) {
    return useQuery({
        queryKey: ["userList"],
        queryFn: fetchUsers,
        enabled,
    })
}
