import { AdminTab } from "@/components/admin-tab";

export default function AdminPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AdminTab />
      </div>
    </div>
  );
}
