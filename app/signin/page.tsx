'use client'
import { LoginForm } from "@/components/login-form"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function SigninPage() {
    const router = useRouter();

    useEffect(() => {
      const loggedIn = localStorage.getItem('loggedIn');
      if (loggedIn) {
        router.push('/admin');
      }
    }, [router]);


  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-transparent">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
