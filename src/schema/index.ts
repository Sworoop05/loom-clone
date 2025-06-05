import { stringify } from "querystring"
import z from "zod"
export const workspaceSchema = z.object(
    {
        name: z.string().min(1, { message: "Workspace name cannot be empty" })
    }
)
export const moveVideoSchema = z.object({
    folderId: z.string().optional(),
    workspaceId: z.string(),
    videoId: z.string().optional()

})