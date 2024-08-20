import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  const {userId} = auth();
  
  if(userId) {
    redirect("/dashboard");
  }
  return (
    <main>
      <h1>NextJS Auth</h1>
    </main>
  );
}
