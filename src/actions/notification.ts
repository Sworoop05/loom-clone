"use server"
import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
export const getNotification = async () => {
    try {
        const user = await currentUser()
        if (!user) return { status: 401 }
        const notifications = await client.user.findUnique({
            where: {
                clerkId: user.id
            },
            include: {
                notification: {
                    select: {
                        content: true,
                        createdAt: true
                    }
                },
                _count: {
                    select: {
                        notification: true
                    }
                }
            }
        })
        if (notifications) return { status: 200, data: notifications }
        return { status: 404 }
    } catch (error) {
        console.error(`Error fetching notification:`, error)
        return {
            status: 500
        }
    }
}