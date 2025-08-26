import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/contexts/SessionContext";
import { SessionBanner } from "@/components/session-banner/SessionBanner";
import PageTransition from "@/components/page-transition/PageTransition";

export const metadata: Metadata = {
  title: "Sortify",
  description: "Sort your Spotify playlists and liked songs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <SessionProvider>
          <SessionBanner />
          <PageTransition>
            {children}
          </PageTransition>
        </SessionProvider>
      </body>
    </html>
  );
}
