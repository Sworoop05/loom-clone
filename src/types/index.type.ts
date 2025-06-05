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
export type folderProps = {
    data: {
        status: number,
        name: string,
        _count: {
            videos: number
        }
    }
}
export type VideosProp = {
    status: number,
    data: {
        User: {
            firstName: string | null
            lastName: string | null
            image: string | null
        } | null
        id: string,
        processing: boolean,
        Folder: {
            id: string,
            name: string
        } | null
        createdAt: Date
        title: string | null
        source: string
    }[]
}