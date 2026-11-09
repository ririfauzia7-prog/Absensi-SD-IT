import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const khususAdmin = ["/data-siswa", "/data-kelas", "/users"];

export default function DashboardLayout() {
  const { pathname } = useLocation();

  if (localStorage.getItem("isLogin") !== "true") {
    return <Navigate to="/" replace />;
  }

  const role = localStorage.getItem("role");
  if (role !== "admin" && khususAdmin.includes(pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-60">
        <Topbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}