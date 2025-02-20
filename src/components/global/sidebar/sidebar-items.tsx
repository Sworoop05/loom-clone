import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import React, { SVGProps } from "react";

type Props = {
  title: string;
  href: string;
  Icon?: React.ComponentType<LucideProps>;
  NameIcon?: React.ReactNode;
  selected: boolean;
  notifications?: number;
};

const SidebarItems = ({
  href,
  Icon,
  NameIcon,
  notifications,
  selected,
  title,
}: Props) => {
  return (
    <li className="cursor-pointer my-[5px]">
      <Link
        className={cn(
          "flex item-center justify-between group rounded-lg hover:bg-[#1D1D1D]",
          selected ? "bg-[#1D1D1D]" : ""
        )}
        href={href}
      >
        <div className="flex items-center gap-2 transition-all p-[5px] cursor-pointer">
          {Icon ? <Icon /> : NameIcon}
          <span
            className={cn(
              "font-medium group-hover:text-[#9D9D9D] transition-all truncate w-32",
              selected ? "text-[#9D9D9D]" : "text-[#545454]"
            )}
          >
            {title}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default SidebarItems;
