import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ClipboardList,
  Plus,
  RotateCcw,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Rekap = {
  id: number;
  tanggal: string;
  kelas: string;
  guru: string;
  hadir: number;
  izin: number;
  sakit: number;
  alpha: number;
};

const daftarKelas = ["1.A", "1.B", "2.A", "2.B", "3.A", "3.B", "4.A", "4.B", "5", "6"];

const guruKelas: Record<string, string> = {
  "1.A": "Siti Aisyah, S.Pd",
  "1.B": "Lailatul Fitri, S.Pd",
  "2.A": "Nurul Hidayah, S.Pd",
  "2.B": "Dewi Sartika, S.Pd",
  "3.A": "Rudi Kurniawan, S.Pd",
  "3.B": "Yuliana, S.Pd",
  "4.A": "Abdul Rahman, S.Pd",
  "4.B": "Fitriani, S.Pd",
  "5": "Muhammad Faisal, S.Pd",
  "6": "Ayu Wulandari, S.Pd",
};

const tanggalAwal = ["2024-05-24", "2024-05-23", "2024-05-22"];

const dataAwal: Rekap[] = tanggalAwal.flatMap((tanggal, t) =>
  daftarKelas.map((kelas, k) => ({
    id: t * 100 + k + 1,
    tanggal,
    kelas,
    guru: guruKelas[kelas],
    hadir: 20 + ((k + t) % 5),
    izin: (k + t) % 4,
    sakit: (k + 2 * t) % 3,
    alpha: (k + t) % 3 === 0 ? 1 : 0,
  }))
);

const perHalaman = 10;

const formatTanggal = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function DataAbsensi() {
  const navigate = useNavigate();
  const [data, setData] = useState<Rekap[]>(dataAwal);
  const [filterKelas, setFilterKelas] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");
  const [halaman, setHalaman] = useState(1);

  const hasil = useMemo(
    () =>
      data.filter(
        (r) =>
          (filterKelas === "" || r.kelas === filterKelas) &&
          (filterTanggal === "" || r.tanggal === filterTanggal)
      ),
    [data, filterKelas, filterTanggal]
  );

  const totalHalaman = Math.max(1, Math.ceil(hasil.length / perHalaman));
  const awal = (halaman - 1) * perHalaman;
  const tampil = hasil.slice(awal, awal + perHalaman);

  const reset = () => {
    setFilterKelas("");
    setFilterTanggal("");
    setHalaman(1);
  };

  const ubah = (r: Rekap) => {
    navigate(
      `/data-absensi/edit?kelas=${encodeURIComponent(r.kelas)}&tanggal=${r.tanggal}&guru=${encodeURIComponent(r.guru)}`
    );
  };

  const hapus = (r: Rekap) => {
    if (confirm(`Hapus absensi kelas ${r.kelas} tanggal ${formatTanggal(r.tanggal)}?`)) {
      setData(data.filter((x) => x.id !== r.id));
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700";

  return (
    <div>
      {/* Judul */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-700 text-white">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Data Absensi</h1>
            <p className="text-sm text-gray-500">
              Kelola data kehadiran siswa yang telah diinput
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate("/input-absensi")}
          className="flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          <Plus className="h-4 w-4" />
          Input Absensi
        </button>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        {/* Filter */}
        <div className="mb-5 flex flex-wrap items-end gap-4">
          <div className="w-56">
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Filter Kelas
            </label>
            <select
              value={filterKelas}
              onChange={(e) => {
                setFilterKelas(e.target.value);
                setHalaman(1);
              }}
              className={inputClass}
            >
              <option value="">Semua Kelas</option>
              {daftarKelas.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>

          <div className="w-56">
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Tanggal Absensi
            </label>
            <input
              type="date"
              value={filterTanggal}
              onChange={(e) => {
                setFilterTanggal(e.target.value);
                setHalaman(1);
              }}
              className={inputClass}
            />
          </div>

          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-50 text-gray-800">
                <th className="px-3 py-3 text-center font-semibold">No</th>
                <th className="px-3 py-3 text-left font-semibold">Tanggal</th>
                <th className="px-3 py-3 text-center font-semibold">Kelas</th>
                <th className="px-3 py-3 text-left font-semibold">Guru</th>
                <th className="px-3 py-3 text-center font-semibold text-green-700">Hadir</th>
                <th className="px-3 py-3 text-center font-semibold text-orange-500">Izin</th>
                <th className="px-3 py-3 text-center font-semibold text-blue-600">Sakit</th>
                <th className="px-3 py-3 text-center font-semibold text-red-600">Alpha</th>
                <th className="px-3 py-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tampil.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
              {tampil.map((r, i) => (
                <tr key={r.id} className="border-b border-gray-100">
                  <td className="px-3 py-3 text-center">{awal + i + 1}</td>
                  <td className="px-3 py-3">{formatTanggal(r.tanggal)}</td>
                  <td className="px-3 py-3 text-center">{r.kelas}</td>
                  <td className="px-3 py-3">{r.guru}</td>
                  <td className="px-3 py-3 text-center text-green-700">{r.hadir}</td>
                  <td className="px-3 py-3 text-center text-orange-500">{r.izin}</td>
                  <td className="px-3 py-3 text-center text-blue-600">{r.sakit}</td>
                  <td className="px-3 py-3 text-center text-red-600">{r.alpha}</td>
                  <td className="px-3 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => ubah(r)}
                        className="rounded-md bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                        title="Ubah"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => hapus(r)}
                        className="rounded-md bg-red-600 p-2 text-white transition hover:bg-red-700"
                        title="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
          <p>
            Menampilkan {hasil.length === 0 ? 0 : awal + 1} sampai{" "}
            {Math.min(awal + perHalaman, hasil.length)} dari {hasil.length} data
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setHalaman(halaman - 1)}
              disabled={halaman === 1}
              className="rounded-md border border-gray-300 p-1.5 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalHalaman }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setHalaman(n)}
                className={`h-8 w-8 rounded-md border text-xs ${
                  n === halaman
                    ? "border-green-700 bg-green-700 font-semibold text-white"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setHalaman(halaman + 1)}
              disabled={halaman === totalHalaman}
              className="rounded-md border border-gray-300 p-1.5 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}