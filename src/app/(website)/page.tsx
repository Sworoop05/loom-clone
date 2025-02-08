import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Video, MonitorPlay, MessageCircle } from "lucide-react";
import { Redirect } from "next";
import React from "react";
import Logo from "../_components/logo";

export default function Home() {
  return (
    <div className="min-h-screen  w-full flex flex-col dark:bg-gray-900">
      <header className="border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <Button
            variant="outline"
            className="dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            <Link href={"/signin"}> Sign In</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 dark:text-white">
            Record and share video messages with ease
          </h1>
          <p className="text-xl mb-8 dark:text-gray-300">
            Communicate more effectively with quick video messages for work and
            personal use
          </p>
          <Button
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Get Started for Free
          </Button>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<MonitorPlay className="h-8 w-8 text-blue-500" />}
            title="Screen Recording"
            description="Capture your screen with audio and video explanations"
          />
          <FeatureCard
            icon={<Video className="h-8 w-8 text-blue-500" />}
            title="Webcam Recording"
            description="Record yourself or create engaging video messages"
          />
          <FeatureCard
            icon={<MessageCircle className="h-8 w-8 text-blue-500" />}
            title="Instant Sharing"
            description="Share your videos with a simple link or embed them anywhere"
          />
        </div>
      </main>

      <footer className="border-t dark:border-gray-700">
        <div className="container mx-auto px-4 py-6 text-center dark:text-gray-400">
          © 2025 LoomClone. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactElement;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 border rounded-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="dark:text-gray-300">{description}</p>
    </div>
  );
}
