export type Workspace = {
    id: string,
    type: "PUBLIC" | "PERSONAL",
    name: string
}
export type WorkspaceProp = {
    data: {
        subscription: {
            id?: true,
            plan: "FREE" | "PRO"
        } | null,
        workspace: Workspace[],
        member: {
            id?: string,
            workspace: Workspace
        }
    }
}