'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminTab } from '@/components/admin-tab';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      router.push('/signin');
    }
  }, [router]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AdminTab />
      </div>
    </div>
  );
}
