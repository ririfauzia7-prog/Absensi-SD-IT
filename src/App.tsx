import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import DataSiswa from "./pages/DataSiswa";
import DataKelas from "./pages/DataKelas";
import InputAbsensi from "./pages/InputAbsensi";
import DataAbsensi from "./pages/DataAbsensi";
import EditAbsensi from "./pages/EditAbsensi";
import LaporanAbsensi from "./pages/LaporanAbsensi";
import Pengaturan from "./pages/Pengaturan";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data-siswa" element={<DataSiswa />} />
        <Route path="/data-kelas" element={<DataKelas />} />
        <Route path="/input-absensi" element={<InputAbsensi />} />
        <Route path="/data-absensi" element={<DataAbsensi />} />
        <Route path="/data-absensi/edit" element={<EditAbsensi />} />
        <Route path="/laporan-absensi" element={<LaporanAbsensi />} />
        <Route path="/pengaturan" element={<Pengaturan />} />
      </Route>
    </Routes>
  );
}