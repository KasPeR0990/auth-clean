"use client";

import Image from "next/image";
import { Roboto_Mono } from "next/font/google";
import { useWindowSize } from "@/hooks/use-window-size";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { height } = useWindowSize();

  return (
    <div 
      className={`fixed inset-0 grid lg:grid-cols-2 ${robotoMono.className}`}
      style={{ height: `${height}px` }}
    >
      <div className="flex items-center justify-center px-4 sm:px-8 lg:px-16 overflow-hidden">
        <div className="w-full max-w-[440px]">
          {children}
        </div>
      </div>
      <div className="hidden lg:block relative">
        <Image
          src="/auth-background.jpg"
          alt="Authentication background"
          fill
          quality={100}
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}