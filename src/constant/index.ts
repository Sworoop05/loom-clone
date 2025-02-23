import { Bell, CreditCard, Home, Library, LucideProps, Receipt, Settings } from "lucide-react";

export const Menu_Items = (workspaceId: string): {
    title: string;
    href: string;
    icon: React.ComponentType<LucideProps>
}[] => [
        {
            title: "Home",
            href: `/dashboard/${workspaceId}/home`,
            icon: Home
        },
        {
            title: "My library",
            href: `/dashboard/${workspaceId}`,
            icon: Library
        },
        {
            title: "Notifications",
            href: `/dashboard/${workspaceId}/notifications`,
            icon: Bell
        },
        {
            title: "Billing ",
            href: `/dashboard/${workspaceId}/billing`,
            icon: CreditCard
        },
        {
            title: "Settings ",
            href: `/dashboard/${workspaceId}/settings`,
            icon: Settings
        },
    ]