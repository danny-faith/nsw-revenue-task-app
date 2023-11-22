"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linkClassesInactive =
  "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white";

const linkClassesActive = `${linkClassesInactive} bg-gray-900 text-white`;

type PropsLinks = {
  pathname: string;
  label: string;
};

const links: PropsLinks[] = [
  {
    pathname: "/",
    label: "Home",
  },
  {
    pathname: "/image-viewer",
    label: "Image viewer",
  },
];

function Links({ links }: { links: PropsLinks[] }) {
  const currentPathname = usePathname();

  return links.map(({ label, pathname }, i) => (
    <Link
      className={
        currentPathname === pathname ? linkClassesActive : linkClassesInactive
      }
      key={i}
      href={pathname}
    >
      {label}
    </Link>
  ));
}

function AuthButton() {
  const { data: session } = useSession();
  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

  // TODO: refactor the below into components if time permits
  if (session) {
    return (
      <div className="flex">
        <p className="px-3 py-2 text-sm font-medium text-gray-300 flex">
          <span className="hidden md:block">Welcome:</span>
          {session?.user?.image && (
            <Image
              src={session?.user?.image}
              width={24}
              height={24}
              alt="User avatar"
              className="rounded-full mx-2 -mt-1 hidden md:block"
            />
          )}
          {session?.user?.name}
        </p>
        <button className={linkClassesInactive} onClick={handleSignOutClick}>
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
      <button className={linkClassesInactive} onClick={handleSignInClick}>
        Sign in
      </button>
    </div>
  );
}

export default function NavMenu() {
  return (
    <div className="bg-slate-500 p-2 flex justify-center">
      <Links links={links} />
      <p className="px-3 py-2 text-sm font-medium text-gray-300">|</p>
      <AuthButton />
    </div>
  );
}
