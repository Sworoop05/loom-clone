import { createFolder } from "@/actions/workspace"
import { useMutationData } from "./use-mutation"

export const useCreateFolder = (workspaceId: string) => {
    const { mutate, isPending } = useMutationData(["create-folder"], async (folderInfo) => createFolder(workspaceId, folderInfo), "workspace-folders")
    const onCreateNewFolder = () => mutate({ name: "untitled", id: `optimistic--id-${new Date()}` })
    return {
        onCreateNewFolder
    }
}