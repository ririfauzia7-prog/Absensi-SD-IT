import { CircleUser } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-14 items-center justify-end border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <CircleUser className="h-6 w-6 text-green-700" />
        Admin
      </div>
    </header>
  );
}