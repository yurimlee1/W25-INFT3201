import { AddTab } from "@/components/add-tab";
import React from "react";

export default function AddPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <AddTab />
      </div>
    </div>
  );
}
