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
            console.log("if created:", createUser)
            return {
                status: 201,
                user: createUser
            }
        }
        console.log("if already exists:", isUserExist)
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
