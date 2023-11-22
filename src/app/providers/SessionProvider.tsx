"use client";
import { SessionProvider } from "next-auth/react";
// re-exporting SessionProvider with "use client" directive to tell NextJS that we want this component client side
export default SessionProvider;
