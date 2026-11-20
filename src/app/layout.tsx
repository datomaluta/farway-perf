import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Farway",
  description: "Slow travel stories, field notes and guides.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
