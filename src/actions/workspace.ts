"use server"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
export const verifyWorkspaceAccess = async (workspaceId: string) => {
    try {
        const user = await currentUser()
        if (!user) return { status: 403 }
        const hasAccessToWorkspace = await client.workspace.findUnique({
            where: {
                id: workspaceId,
                OR: [
                    {
                        user: {
                            clerkId: user?.id
                        }
                    }, {
                        members: {
                            some: {
                                user: {
                                    clerkId: user?.id
                                }
                            }
                        }
                    }
                ]
            }
        })
        if (!hasAccessToWorkspace) return {
            status: 404,
            message: "workspace not found"
        }
        return {
            status: 200,
            data: hasAccessToWorkspace
        }
    } catch (error) {
        return {
            status: 500,
            message: "something went wrong while fetcthing the workspace"
        }
    }
}
export const getWorkspaceFolders = async (workspaceId: string) => {
    try {
        const isFolder = await client.folder.findMany({
            where: {
                workspaceId
            },
            include: {
                _count: {
                    select: {
                        videos: true
                    }
                }
            }
        })
        if (isFolder && isFolder.length > 0) {
            return {
                status: 200,
                data: isFolder
            }
        }
        return {
            status: 404
        }
    } catch (error) {
        return {
            status: 500,
            message: "Something went wrong while fetching the workspace folders"
        }
    }
}
export const getAllUserVideos = async (workspaceId: string) => {
    try {
        const user = await currentUser()
        if (!user) return { status: 401 }
        const userVideos = await client.video.findMany({
            where: {
                OR: [{ workspaceId }, { folderId: workspaceId }]
            },
            include: {
                folder: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        image: true
                    }
                }
            },
            orderBy: {
                createdAt: "asc"
            }
        })
        if (userVideos && userVideos.length > 0) {
            return {
                status: 200,
                daat: userVideos
            }
        }
        return {
            status: 404
        }
    } catch (error) {
        console.error("While fetching videos", error)
        return {
            status: 500
        }
    }
}
export const getWorkspaces = async () => {
    try {
        const user = await currentUser()
        if (!user) return { status: 401 }
        const workspace = await client.user.findUnique({
            where: {
                clerkId: user?.id
            },
            select: {
                subscription: {
                    select: {
                        id: true,
                        plan: true
                    }
                },
                workspaces: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                },
                members: {
                    select: {
                        id: true,
                        workspace: {
                            select: {
                                id: true,
                                name: true,
                                type: true
                            }
                        }
                    }
                }
            }
        })
        if (workspace) return {
            status: 200,
            data: workspace
        }
        return {
            status: 404
        }
    } catch (error) {
        console.error(`Error fetching workspaces:`, error)
        return {
            status: 500
        }
    }
}