'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminTab } from '@/components/admin-tab';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      router.push('/signin');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    router.push('/signin');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="pt-4 w-full max-w-4xl">
        <AdminTab />
      </div>
      <div className="mt-4">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
}