"use server"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
export const moveVideoLocation = async (
    videoId: string,
    folderId: string,
    workspaceId: string
) => {
    try {
        const location = await client.video.update({
            where: {
                id: videoId
            },
            data: {
                folderId: folderId,
                workspaceId
            }
        })
        if (location) {
            return {
                status: 200,
                data: "folder change successfully"
            }
        }
        return {
            status: 404,
            data: "workspace/ folder not found"
        }

    } catch (error) {
        return {
            status: 500,
            message: `Something went wrong while moving the video: ${error}`
        }
    }
}