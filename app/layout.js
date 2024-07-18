import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FoodIt",
  description: "Order food on your table in your favorite",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header>
            <SignedIn>
              <UserButton afterSwitchSessionUrl="/"/>
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
