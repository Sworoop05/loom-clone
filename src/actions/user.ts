"use server"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
export const onAuthenticateUser = async () => {
    const user = await currentUser()
    if (!user) {
        return {
            status: 401
        }
    }
    try {
        const isUserExist = await client.user.findUnique({
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
                        plan: true
                    }
                }
            }
        })
        if (!isUserExist) {
            const createUser = await client.user.create({
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.emailAddresses[0].emailAddress,
                    image: user.imageUrl,
                    clerkId: user.id,
                    subscription: {
                        create: {}
                    },
                    workspaces: {
                        create: {
                            name: `${user.firstName}'s workshop`,
                            type: "PERSONAL"

                        }
                    }

                },
                include: {
                    workspaces: {
                        select: {
                            id: true,
                            type: true,
                            name: true
                        },

                    },
                    subscription: {
                        select: {
                            id: true,
                            plan: true
                        }
                    }
                }
            })
            // console.log("if created:", createUser)
            return {
                status: 201,
                user: createUser
            }
        }
        // console.log("if already exists:", isUserExist)
        return {
            status: 200,
            user: isUserExist

        }
    } catch (error) {
        return {
            message: `${error}`,
            status: 500
        }
    }
}
export const searchUsers = async (query: string) => {
    try {
        const user = await currentUser()
        if (!user) {
            return {
                status: 401,
                message: "unauthorized user"
            }
        }
        const searchUser = await client.user.findMany({
            where: {
                OR: [{ firstName: { contains: query } }, { lastName: { contains: query } }, { email: { contains: query } }],
                NOT: { clerkId: user.id }
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                image: true,
                subscription: {
                    select: {
                        plan: true
                    }
                }
            }
        })
        if (!searchUser || searchUser.length == 0) {
            return {
                status: 400,
                message: "No User found"
            }
        }
        return {
            status: 200,
            data: searchUser
        }
    } catch (error) {
        return {
            status: 500,
            message: `something went wrong while searching user:: ${error}`
        }
    }
}