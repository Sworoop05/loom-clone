import React from "react";
import Link from "next/link";
import { Video } from "lucide-react";
const Logo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center space-x-2">
        <Video className="h-6 w-6 text-blue-500" />
        <span className="text-xl font-bold dark:text-white">LoomClone</span>
      </Link>
    </div>
  );
};

export default Logo;
