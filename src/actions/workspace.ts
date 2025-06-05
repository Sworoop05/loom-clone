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
            message: `erroe fetching hasAccess: ${error}`
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
            status: 404,
            message: "No folder found"

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
                data: userVideos
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
            include: {
                workspaces: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                },
                subscription: {
                    select: {
                        id: true,
                        plan: true
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
            },


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
            status: 500,
            message: `Error fetching workspace: ${error}`
        }
    }
}
export const createWorkspace = async (name: string) => {
    try {
        const user = await currentUser();
        if (!user) return { status: 401, message: "unauthorized user" }
        const authorized = await client.user.findUnique({
            where: {
                clerkId: user.id
            },
            select: {
                id: true,
                subscription: {
                    select: {
                        plan: true
                    }
                }
            }
        })
        if (authorized?.subscription?.plan === "PRO") {
            const result = await client.user.update({
                where: {
                    id: authorized.id
                },
                data: {
                    workspaces: {
                        create: {
                            name,
                            type: "PUBLIC"
                        }
                    }
                }
            })
            if (result) {
                return {
                    status: 200,
                    message: "workspace has been created successfully",
                    data: result
                }
            }
            return {
                status: 401,
                message: "you are not authorized "
            }
        }
    } catch (error) {
        return {
            status: 500,
            message: `something went wrong while creating the workspace: ${error}`
        }
    }
}

export const renameFolders = async (folderId: string, name: string) => {
    try {
        const folder = await client.folder.update({
            where: {
                id: folderId
            },
            data: {
                name
            }
        })
        if (!folder) {
            return {
                status: 404,
                message: "cannot find the folder"
            }
        }
        return {
            status: 200,
            message: "folder renamed successfully",
            data: folder
        }
    } catch (error) {
        return {
            status: 500,
            message: "something went wrong while renaming the folder"
        }
    }
}
export const createFolder = async (workspaceId: string, folderInfo: { name: string, id: string }) => {
    const user = await currentUser()
    if (!user) {
        return {
            status: 401,
            message: "unauthorized user"
        }
    }
    try {
        const isWorkspaceExist = await client.workspace.findUnique({
            where: {
                id: workspaceId
            }
        })
        if (!isWorkspaceExist) {
            return {
                status: 404,
                message: "Workspace not found"
            }
        }
        const createFolder = await client.folder.create({
            data: {
                workspaceId,
                name: folderInfo.name
            }
        })
        if (!createFolder) {
            return {
                status: 501,
                message: "something went wrong while creating the folder"
            }
        }
        return {
            status: 200,
            data: createFolder
        }
    } catch (error) {
        return {
            status: 500,
            message: `Opps! Something went wrong while creating the folder: ${error}`
        }
    }
}
