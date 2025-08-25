import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
