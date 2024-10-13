"use client";
import { useUser } from "@/src/components/context/context.providet";
import Landing from "@/src/components/modules/home/Landing";

export default function Home() {
  const { user } = useUser();

  return <>{user ? <></> : <Landing />}</>;
}
