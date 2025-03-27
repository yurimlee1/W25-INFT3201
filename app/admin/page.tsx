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
    <div>
      <div className="flex justify-end pt-20 pr-7">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <div className="flex w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <AdminTab />
        </div>
      </div>
    </div>
  );
}
