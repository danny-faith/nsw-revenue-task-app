"use client";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();
  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

  // refactor the below into components
  if (session) {
    return (
      <>
        {session?.user?.name} <br />
        <button onClick={handleSignOutClick}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={handleSignInClick}>Sign in</button>
    </>
  );
}

export default function NavMenu() {
  return (
    <div>
      <AuthButton />
    </div>
  );
}
