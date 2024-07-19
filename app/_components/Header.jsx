'use client'
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="flex justify-between items-center py-6 shadow-sm">
      <Image src="/logo.png" alt="Vecteezy.com" width={50} height={50} />
      <div className="hidden md:flex border p-2 rounded-lg bg-gray-100 w-96">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent w-full outline-none"
        />

        <Search className="text-primary" />
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <div className="flex gap-2">
          <SignInButton mode="modal">
            <Button variant="outline">Login</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button>Sign Up</Button>
          </SignUpButton>
        </div>
      )}
    </div>
  );
}

export default Header;
