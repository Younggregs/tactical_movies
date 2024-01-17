import React from "react";
import Image from "next/image";

type PageLayoutProps = {
  fullScreen: Boolean;
  children: React.ReactNode;
};

const PageLayout = ({ fullScreen, children }: PageLayoutProps) => {
  if (fullScreen) {
    return (
      <main className="flex flex-col bg-background-color min-h-full h-screen justify-between">
        {children}
        <div className="relative w-full bg-background-color h-16">
          <Image
            src="/images/background.svg"
            alt="background-image"
            width={1920}
            height={1080}
          />
        </div>
      </main>
    );
  } else {
    return (
      <main className="flex flex-col bg-background-color min-h-full min-h-screen justify-between">
        {children}
        <div className="relative w-full bg-background-color h-16">
          <Image
            src="/images/background.svg"
            alt="background-image"
            width={1920}
            height={1080}
          />
        </div>
      </main>
    );
  }
};

export { PageLayout };
