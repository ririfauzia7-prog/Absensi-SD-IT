import { Users, CalendarCheck, Clock, UserX } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import StatCard from "../components/StatCard";

const grafik = [
  { tgl: "18 Mei", hadir: 105, izin: 9, sakit: 2, alpha: 1 },
  { tgl: "19 Mei", hadir: 105, izin: 9, sakit: 4, alpha: 0 },
  { tgl: "20 Mei", hadir: 100, izin: 10, sakit: 12, alpha: 1 },
  { tgl: "21 Mei", hadir: 90, izin: 12, sakit: 14, alpha: 1 },
  { tgl: "22 Mei", hadir: 82, izin: 10, sakit: 11, alpha: 1 },
  { tgl: "23 Mei", hadir: 92, izin: 8, sakit: 12, alpha: 2 },
  { tgl: "24 Mei", hadir: 107, izin: 22, sakit: 9, alpha: 10 },
];

const absensi = [
  { tgl: "24 Mei 2024", kelas: "2.A", hadir: 23, izin: 3, sakit: 2, alpha: 1 },
  { tgl: "24 Mei 2024", kelas: "2.B", hadir: 21, izin: 4, sakit: 1, alpha: 1 },
  { tgl: "24 Mei 2024", kelas: "3.A", hadir: 20, izin: 2, sakit: 1, alpha: 2 },
  { tgl: "24 Mei 2024", kelas: "3.B", hadir: 22, izin: 1, sakit: 2, alpha: 1 },
  { tgl: "24 Mei 2024", kelas: "4.A", hadir: 24, izin: 1, sakit: 1, alpha: 0 },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      <p className="mb-6 text-sm text-gray-500">
        Berikut adalah ringkasan informasi absensi siswa
      </p>

      {/* Kartu statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Siswa"
          value={120}
          note="Siswa terdaftar"
          icon={Users}
          color="bg-green-600"
        />
        <StatCard
          label="Hari Ini Hadir"
          value={98}
          note="Siswa"
          icon={CalendarCheck}
          color="bg-blue-600"
        />
        <StatCard
          label="Hari Ini Izin"
          value={12}
          note="Siswa"
          icon={Clock}
          color="bg-orange-500"
        />
        <StatCard
          label="Hari Ini Alpha"
          value={10}
          note="Siswa"
          icon={UserX}
          color="bg-red-600"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-5">
        {/* Grafik */}
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 xl:col-span-3">
          <h2 className="mb-4 text-sm font-semibold text-gray-800">
            Grafik Kehadiran (7 Hari Terakhir)
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={grafik}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="tgl" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="hadir" name="Hadir" stroke="#16a34a" strokeWidth={2} />
                <Line type="monotone" dataKey="izin" name="Izin" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="sakit" name="Sakit" stroke="#2563eb" strokeWidth={2} />
                <Line type="monotone" dataKey="alpha" name="Alpha" stroke="#dc2626" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabel */}
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 xl:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-gray-800">
            Absensi Terbaru
          </h2>
          <table className="w-full text-center text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600">
                <th className="py-2 text-left">Tanggal</th>
                <th>Kelas</th>
                <th className="text-green-600">Hadir</th>
                <th className="text-orange-500">Izin</th>
                <th className="text-blue-600">Sakit</th>
                <th className="text-red-600">Alpha</th>
              </tr>
            </thead>
            <tbody>
              {absensi.map((row, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-2 text-left">{row.tgl}</td>
                  <td>{row.kelas}</td>
                  <td className="text-green-600">{row.hadir}</td>
                  <td className="text-orange-500">{row.izin}</td>
                  <td className="text-blue-600">{row.sakit}</td>
                  <td className="text-red-600">{row.alpha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}