import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";
import QuertClientProvider from "@/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Track Me | Issue Tracker",
  description: "Track Me is a simple issue tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QuertClientProvider>
          <AuthProvider>
            <Theme scaling="110%">
              <NavBar />
              <Container>
                <main className="p-5">{children}</main>
              </Container>
              {/* <ThemePanel /> */}
            </Theme>
          </AuthProvider>
        </QuertClientProvider>
      </body>
    </html>
  );
}
