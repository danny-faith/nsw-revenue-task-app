"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const classNames =
  "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white";

function AuthButton() {
  const { data: session } = useSession();
  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

  // refactor the below into components
  if (session) {
    return (
      <div className="flex">
        <p className="px-3 py-2 text-sm font-medium text-gray-300 flex">
          Welcome:
          {session?.user?.image && (
            <Image
              src={session?.user?.image}
              width={24}
              height={24}
              alt="User avatar"
              className="rounded-full mx-2 -mt-1"
            />
          )}
          {session?.user?.name}
        </p>
        <button className={classNames} onClick={handleSignOutClick}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="flex">
      <p className="px-3 py-2 text-sm font-medium text-gray-300">
        Not signed in
      </p>
      <button className={classNames} onClick={handleSignInClick}>
        Sign in
      </button>
    </div>
  );
}

export default function NavMenu() {
  return (
    <div className="bg-slate-500 p-2 flex justify-center">
      <Link className={classNames} href="/">
        Home
      </Link>
      <Link className={classNames} href="/image-viewer">
        Image viewer
      </Link>
      <p className="px-3 py-2 text-sm font-medium text-gray-300">|</p>
      <AuthButton />
    </div>
  );
}
