import type { Metadata } from "next";
import { RadioProvider } from "./contexts/RadioContext";
import Popup from './Popup'; 

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
          <Popup /> {/* Her sayfada radyo popup'ı görünecek */}
        </RadioProvider>
      </body>
    </html>
  );
}
