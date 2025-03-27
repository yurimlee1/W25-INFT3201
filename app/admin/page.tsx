'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminTab } from '@/components/admin-tab';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useCallback } from 'react';

export default function AdminPage() {
  const router = useRouter();
  const [locationName, setLocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [refreshLocations, setRefreshLocations] = useState<() => void>(() => {});

  // Memoize onLocationAdded
  const onLocationAdded = useCallback((fetchFn) => {
    setRefreshLocations(() => fetchFn);
  }, []);

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

  const handleAddLocation = async (event: any) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: locationName, address: locationAddress }),
      });
      if (!response.ok) throw new Error("Failed to add location");
      toast.success("Location added successfully");
      setLocationName("");
      setLocationAddress("");
      if (refreshLocations) refreshLocations();
    } catch (error) {
      console.error("Error adding location:", error);
      toast.error("Failed to add location");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="pt-4 w-full max-w-4xl">
        <AdminTab onLocationAdded={onLocationAdded} />
      </div>
      <div className="mt-4">
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      {/* Popover for Adding Locations */}
      <Popover>
        <PopoverTrigger asChild>
          <Button className="fixed bottom-4 right-4">+</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Add a Location</h3>
            <form onSubmit={handleAddLocation} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="locationName">Name</Label>
                <Input
                  id="locationName"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="locationAddress">Address</Label>
                <Input
                  id="locationAddress"
                  value={locationAddress}
                  onChange={(e) => setLocationAddress(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Add Location</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}