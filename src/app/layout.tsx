import type { Metadata } from "next";
import { RadioProvider } from "./contexts/RadioContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <RadioProvider>
        <main>{children}</main>
        </RadioProvider>
      </body>
    </html>
  );
}
