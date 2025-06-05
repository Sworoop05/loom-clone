import { useAppSelector } from "@/redux/store"
import { useEffect, useState } from "react"
import { useMutationData } from "./use-mutation"
import { moveVideoLocation } from "@/actions/video"
import useZodForm from "./useZodForm"
import { moveVideoSchema } from "@/schema"
import { getWorkspaceFolders } from "@/actions/workspace"
export const useMoveVideo = (videoId: string, currentworkspace: string) => {
    //get state redux
    const { folders } = useAppSelector((state) => state.FolderReducer)
    const { workspaces } = useAppSelector((state) => state.WorkspaceReducer)
    //fetching state    
    const [isFetching, setIsFetching] = useState(false)
    //stat folder 
    const [isFolders, setIsFolders] = useState<| (
        {
            _count:
            { videos: number }
        } & {
            id: string,
            name: string,
            createdAt: Date,
            workspaceId: string | null,
        }
    )[] | undefined>(undefined)
    //use mutation data optimistic
    const { mutate, isPending } = useMutationData(
        ["change-video-location"],
        (data: { folderId: string, workspaceId: string, }) => {
            return moveVideoLocation(videoId, data.folderId, data.workspaceId)
        }
    )
    //use zod form
    const { errors, onFormSubmit, watch, register } = useZodForm(moveVideoSchema, mutate, { folderId: null, workspaceId: currentworkspace, videoId })
    //fetchfolders wiith a useEffect
    const fetchFolders = async (workspace: string) => {
        setIsFetching(true)
        const folders = await getWorkspaceFolders(workspace)
        setIsFetching(false)
        setIsFolders(folders.data)
    }
    useEffect(() => {
        fetchFolders(currentworkspace)
    }, [])
    useEffect(() => {
        const subscription = watch(async (value) => {
            if (value.workspaceId) {
                await fetchFolders(value.workspaceId);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, fetchFolders]);
    return {
        onFormSubmit,
        errors,
        register,
        isPending,
        folders,
        isFetching,
        isFolders,
        workspaces
    }
}   