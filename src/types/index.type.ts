export type Workspace = {
    id: string,
    type: "PUBLIC" | "PERSONAL",
    name: string
}
export type error = {
    status: number,
    message?: string
}
export type WorkspaceProp = {
    status: number,
    data: {
        firstName: string,
        lastName: string,
        image: string,
        subscription: {
            id?: true,
            plan: "FREE" | "PRO"
        } | null,
        workspaces: Workspace[],
        members: {
            id?: string,
            workspace: Workspace
        }[]
    }
}
export type NotificationProps = {
    status: number,
    data: {
        _count: {
            notifications: number
        }
    }
}