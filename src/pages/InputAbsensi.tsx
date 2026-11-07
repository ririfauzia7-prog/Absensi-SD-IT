import { useMemo, useState } from "react";
import { ClipboardCheck, Info, Save } from "lucide-react";

type Status = "Hadir" | "Izin" | "Sakit" | "Alpha";

const daftarKelas = ["1.A", "1.B", "2.A", "2.B", "3.A", "3.B", "4.A", "4.B", "5", "6"];

const namaContoh = [
  "Fadli Ramadhan",
  "Nabila Putri",
  "Raihan Maulana",
  "Aisyah Zahra Ramadhani",
  "Muhammad Rizky A.",
  "Salsabila Putri",
  "Ahmad Fauzi",
  "Khanza Azzahra",
  "Daffa Alfarizi",
  "Qonita Nur Aini",
];

const siswaPerKelas = (kelas: string) => {
  const idx = daftarKelas.indexOf(kelas);
  return namaContoh.map((nama, i) => ({
    nis: `23${String(idx + 1).padStart(2, "0")}${String(i + 1).padStart(2, "0")}`,
    nama,
  }));
};

const warnaStatus: Record<Status, string> = {
  Hadir: "text-green-700 border-green-400",
  Izin: "text-orange-500 border-orange-300",
  Sakit: "text-blue-600 border-blue-300",
  Alpha: "text-red-600 border-red-300",
};

const hariIni = () => new Date().toISOString().slice(0, 10);

export default function InputAbsensi() {
  const [kelas, setKelas] = useState("2.A");
  const [tanggal, setTanggal] = useState(hariIni());
  const [status, setStatus] = useState<Record<string, Status>>({});

  const siswa = useMemo(() => siswaPerKelas(kelas), [kelas]);

  const ambilStatus = (nis: string): Status => status[nis] ?? "Hadir";

  const ubahKelas = (k: string) => {
    setKelas(k);
    setStatus({});
  };

  const batal = () => {
    setStatus({});
    setTanggal(hariIni());
  };

  const simpan = () => {
    const rekap = { Hadir: 0, Izin: 0, Sakit: 0, Alpha: 0 };
    siswa.forEach((s) => {
      rekap[ambilStatus(s.nis)]++;
    });

    console.log({
      kelas,
      tanggal,
      data: siswa.map((s) => ({ nis: s.nis, status: ambilStatus(s.nis) })),
    });

    alert(
      `Absensi kelas ${kelas} berhasil disimpan.\n\nHadir: ${rekap.Hadir}\nIzin: ${rekap.Izin}\nSakit: ${rekap.Sakit}\nAlpha: ${rekap.Alpha}`
    );
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700";

  return (
    <div>
      {/* Judul */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-700 text-white">
          <ClipboardCheck className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Input Absensi Siswa</h1>
          <p className="text-sm text-gray-500">
            Isi kehadiran siswa pada tanggal yang dipilih
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        {/* Filter */}
        <div className="mb-5 flex flex-wrap items-end gap-4">
          <div className="w-56">
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Pilih Kelas
            </label>
            <select
              value={kelas}
              onChange={(e) => ubahKelas(e.target.value)}
              className={inputClass}
            >
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
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex-1">
            <p className="mb-1 text-xs font-semibold text-gray-700">Keterangan</p>
            <div className="flex flex-wrap gap-4 rounded-lg bg-green-50 px-4 py-2.5 text-xs">
              <span className="text-green-700">H: Hadir</span>
              <span className="text-orange-500">I: Izin</span>
              <span className="text-blue-600">S: Sakit</span>
              <span className="text-red-600">A: Alpha</span>
            </div>
          </div>
        </div>

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
              </tr>
            </thead>
            <tbody>
              {siswa.map((s, i) => {
                const st = ambilStatus(s.nis);
                return (
                  <tr key={s.nis} className="border-b border-gray-100">
                    <td className="px-3 py-3 text-center">{i + 1}</td>
                    <td className="px-3 py-3 text-center">{s.nis}</td>
                    <td className="px-3 py-3">{s.nama}</td>
                    <td className="px-3 py-2">
                      <select
                        value={st}
                        onChange={(e) =>
                          setStatus({ ...status, [s.nis]: e.target.value as Status })
                        }
                        className={`w-40 rounded-md border bg-white px-3 py-2 text-sm font-medium outline-none ${warnaStatus[st]}`}
                      >
                        <option value="Hadir">Hadir</option>
                        <option value="Izin">Izin</option>
                        <option value="Sakit">Sakit</option>
                        <option value="Alpha">Alpha</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Info */}
        <div className="mt-5 flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-3 text-xs text-blue-700">
          <Info className="h-4 w-4 shrink-0" />
          Pastikan semua status kehadiran sudah diisi sebelum menyimpan.
        </div>

        {/* Tombol */}
        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={batal}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={simpan}
            className="flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            <Save className="h-4 w-4" />
            Simpan Absensi
          </button>
        </div>
      </div>
    </div>
  );
}