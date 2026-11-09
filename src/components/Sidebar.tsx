import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  School,
  ClipboardList,
  ClipboardCheck,
  FileText,
  Settings,
  UserCog,
  LogOut,
} from "lucide-react";
import logo from "../assets/logo-rihla-insani.svg";

type Peran = "admin" | "user";

const menu: {
  label: string;
  path: string;
  icon: typeof Users;
  peran: Peran[];
}[] = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, peran: ["admin", "user"] },
  { label: "Data Siswa", path: "/data-siswa", icon: Users, peran: ["admin"] },
  { label: "Data Kelas", path: "/data-kelas", icon: School, peran: ["admin"] },
  { label: "Input Absensi", path: "/input-absensi", icon: ClipboardList, peran: ["admin", "user"] },
  { label: "Data Absensi", path: "/data-absensi", icon: ClipboardCheck, peran: ["admin", "user"] },
  { label: "Laporan Absensi", path: "/laporan-absensi", icon: FileText, peran: ["admin", "user"] },
  { label: "Users", path: "/users", icon: UserCog, peran: ["admin"] },
  { label: "Pengaturan", path: "/pengaturan", icon: Settings, peran: ["admin", "user"] },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [konfirmasi, setKonfirmasi] = useState(false);

  const role = (localStorage.getItem("role") as Peran) ?? "user";
  const menuTampil = menu.filter((m) => m.peran.includes(role));

  const logout = () => {
    ["isLogin", "role", "nama", "username"].forEach((k) => localStorage.removeItem(k));
    setKonfirmasi(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 flex w-60 flex-col bg-green-900 text-white">
                <div className="border-b border-green-800 p-5 text-center">
          <img src={logo} alt="Logo SD IT Rihla Insani" className="mx-auto mb-3 h-20 w-20" />
          <h1 className="text-lg font-bold">SD IT Rihla Insani</h1>
          <p className="text-xs text-green-200">Sistem Informasi Absensi Siswa</p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {menuTampil.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-green-600 font-semibold"
                    : "text-green-100 hover:bg-green-800"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}

          <button
            onClick={() => setKonfirmasi(true)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
              konfirmasi
                ? "bg-green-600 font-semibold"
                : "text-green-100 hover:bg-green-800"
            }`}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Popup konfirmasi logout */}
      {konfirmasi && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setKonfirmasi(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
              <LogOut className="h-8 w-8 text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Logout</h2>
            <p className="mt-3 text-sm text-gray-600">
              Apakah Anda yakin ingin keluar dari sistem?
              <br />
              Anda perlu login kembali untuk mengakses sistem.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setKonfirmasi(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={logout}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <LogOut className="h-4 w-4" />
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}