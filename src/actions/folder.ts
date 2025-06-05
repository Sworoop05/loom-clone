"use server"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
export const getFolderInfo = async (folderId: string) => {
    try {
        const folderInfo = await client.folder.findUnique({
            where: { id: folderId },
            select: {
                name: true,
                _count: {
                    select: {
                        videos: true
                    }
                }
            }
        })
        if (folderInfo) {
            return {
                status: 200,
                data: folderInfo
            }
        }
        return {
            status: 404,
            message: "folder not found"
        }
    } catch (error) {
        return {
            status: 500,
            message: `something went wrong while fetching folderInfo: ${error}`
        }

    }
}
