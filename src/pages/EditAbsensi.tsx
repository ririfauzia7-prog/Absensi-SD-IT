import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Pencil,
  ArrowLeft,
  Users,
  CalendarDays,
  CircleUser,
  X,
  Save,
} from "lucide-react";

type Status = "Hadir" | "Izin" | "Sakit" | "Alpha";

type Baris = {
  nis: string;
  nama: string;
  status: Status;
  ket: string;
};

const dataAwal: Baris[] = [
  { nis: "230001", nama: "Fadli Ramadhan", status: "Hadir", ket: "-" },
  { nis: "230002", nama: "Nabila Putri", status: "Hadir", ket: "-" },
  { nis: "230003", nama: "Raihan Maulana", status: "Izin", ket: "Izin keperluan keluarga" },
  { nis: "230004", nama: "Aisyah Zahra Ramadhani", status: "Hadir", ket: "-" },
  { nis: "230005", nama: "Muhammad Rizky A.", status: "Sakit", ket: "Demam" },
  { nis: "230006", nama: "Salsabila Putri", status: "Hadir", ket: "-" },
  { nis: "230007", nama: "Ahmad Fauzi", status: "Alpha", ket: "Tanpa keterangan" },
  { nis: "230008", nama: "Khanza Azzahra", status: "Hadir", ket: "-" },
  { nis: "230009", nama: "Daffa Alfarizi", status: "Izin", ket: "Izin keperluan keluarga" },
  { nis: "230010", nama: "Qonita Nur Aini", status: "Hadir", ket: "-" },
];

const warnaStatus: Record<Status, string> = {
  Hadir: "text-green-700 border-green-400",
  Izin: "text-orange-500 border-orange-300",
  Sakit: "text-blue-600 border-blue-300",
  Alpha: "text-red-600 border-red-300",
};

export default function EditAbsensi() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const kelas = params.get("kelas") ?? "2.A";
  const tanggal = params.get("tanggal") ?? "2024-05-24";
  const guru = params.get("guru") ?? "Siti Aisyah, S.Pd";

  const [rows, setRows] = useState<Baris[]>(dataAwal);

  const tanggalTampil = new Date(`${tanggal}T00:00:00`).toLocaleDateString(
    "id-ID",
    { day: "numeric", month: "long", year: "numeric" }
  );

  const ubah = (nis: string, perubahan: Partial<Baris>) => {
    setRows(rows.map((r) => (r.nis === nis ? { ...r, ...perubahan } : r)));
  };

  const kembali = () => navigate("/data-absensi");

  const simpan = () => {
    console.log({ kelas, tanggal, data: rows });
    alert("Perubahan absensi berhasil disimpan.");
    kembali();
  };

  return (
    <div>
      {/* Judul */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-700 text-white">
            <Pencil className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Edit Data Absensi</h1>
            <p className="text-sm text-gray-500">
              Ubah data kehadiran siswa yang telah diinput
            </p>
          </div>
        </div>
        <button
          onClick={kembali}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Data Absensi
        </button>
      </div>

      {/* Info */}
      <div className="mb-5 grid grid-cols-1 gap-4 rounded-xl bg-green-50 p-4 text-sm md:grid-cols-4">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-green-700" />
          <div>
            <p className="text-xs text-gray-500">Kelas</p>
            <p className="font-semibold text-gray-900">{kelas}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-green-700" />
          <div>
            <p className="text-xs text-gray-500">Tanggal Absensi</p>
            <p className="font-semibold text-gray-900">{tanggalTampil}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CircleUser className="h-5 w-5 text-green-700" />
          <div>
            <p className="text-xs text-gray-500">Guru</p>
            <p className="font-semibold text-gray-900">{guru}</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500">Keterangan</p>
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="text-green-700">H: Hadir</span>
            <span className="text-orange-500">I: Izin</span>
            <span className="text-blue-600">S: Sakit</span>
            <span className="text-red-600">A: Alpha</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-50 text-gray-800">
                <th className="px-3 py-3 text-center font-semibold">No</th>
                <th className="px-3 py-3 text-center font-semibold">NIS</th>
                <th className="px-3 py-3 text-left font-semibold">Nama Siswa</th>
                <th className="px-3 py-3 text-left font-semibold">
                  Status Kehadiran <span className="text-red-600">*</span>
                </th>
                <th className="px-3 py-3 text-left font-semibold">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.nis} className="border-b border-gray-100">
                  <td className="px-3 py-3 text-center">{i + 1}</td>
                  <td className="px-3 py-3 text-center">{r.nis}</td>
                  <td className="px-3 py-3">{r.nama}</td>
                  <td className="px-3 py-2">
                    <select
                      value={r.status}
                      onChange={(e) =>
                        ubah(r.nis, { status: e.target.value as Status })
                      }
                      className={`w-40 rounded-md border bg-white px-3 py-2 text-sm font-medium outline-none ${warnaStatus[r.status]}`}
                    >
                      <option value="Hadir">Hadir</option>
                      <option value="Izin">Izin</option>
                      <option value="Sakit">Sakit</option>
                      <option value="Alpha">Alpha</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={r.ket}
                      onChange={(e) => ubah(r.nis, { ket: e.target.value })}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tombol */}
        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={kembali}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            <X className="h-4 w-4" />
            Batal
          </button>
          <button
            onClick={simpan}
            className="flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            <Save className="h-4 w-4" />
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}