import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

export const metadata: Metadata = {
  title: "Folka Jobs",
  description: "Find your next tech job with us!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-w-400 bg-gray-200 `}>
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
