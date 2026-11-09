import { CircleUser } from "lucide-react";

export default function Topbar() {
  const nama = localStorage.getItem("nama") ?? "Pengguna";
  const role = localStorage.getItem("role") ?? "user";

  return (
    <header className="flex h-14 items-center justify-end border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <CircleUser className="h-6 w-6 text-green-700" />
        {nama}
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
            role === "admin" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
          }`}
        >
          {role === "admin" ? "Admin" : "User"}
        </span>
      </div>
    </header>
  );
}