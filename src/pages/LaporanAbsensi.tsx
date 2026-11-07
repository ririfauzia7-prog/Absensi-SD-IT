import { useMemo, useState } from "react";
import { Printer, FileDown, Info } from "lucide-react";

type Status = "H" | "I" | "S" | "A";

const daftarKelas = ["1.A", "1.B", "2.A", "2.B", "3.A", "3.B", "4.A", "4.B", "5", "6"];
const namaBulan = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];
const daftarTahun = [2023, 2024, 2025, 2026];

const namaSiswa = [
  "Fadli Ramadhan",
  "Nabila Putri",
  "Raihan Maulana",
  "Aisyah Zahra R.",
  "Muhammad Rizky A.",
  "Salsabila Putri",
  "Ahmad Fauzi",
  "Khanza Azzahra",
  "Daffa Alfarizi",
  "Qonita Nur Aini",
];

const buatStatus = (seed: number, tgl: number): Status => {
  const n = (seed * 31 + tgl * 17) % 20;
  if (n === 0) return "A";
  if (n <= 2) return "I";
  if (n <= 4) return "S";
  return "H";
};

const susunLaporan = (kelas: string, bulan: number, tahun: number) => {
  const jumlahHari = new Date(tahun, bulan + 1, 0).getDate();
  const hari: number[] = [];
  for (let d = 1; d <= jumlahHari; d++) {
    const w = new Date(tahun, bulan, d).getDay();
    if (w !== 0 && w !== 6) hari.push(d);
  }

  const idxKelas = daftarKelas.indexOf(kelas);
  return namaSiswa.map((nama, i) => {
    const status = hari.map((d) => buatStatus(i + idxKelas * 3, d));
    const hadir = status.filter((s) => s === "H").length;
    const izin = status.filter((s) => s === "I").length;
    const sakit = status.filter((s) => s === "S").length;
    const alpha = status.filter((s) => s === "A").length;
    return {
      nis: `23${String(idxKelas + 1).padStart(2, "0")}${String(i + 1).padStart(2, "0")}`,
      nama,
      hadir,
      izin,
      sakit,
      alpha,
      total: izin + sakit + alpha,
      persen: Math.round((hadir / status.length) * 100),
    };
  });
};

const nilaiAwal = { kelas: "2.A", bulan: 4, tahun: 2024 };

export default function LaporanAbsensi() {
  const [kelas, setKelas] = useState(nilaiAwal.kelas);
  const [bulan, setBulan] = useState(nilaiAwal.bulan);
  const [tahun, setTahun] = useState(nilaiAwal.tahun);
  const [aktif, setAktif] = useState(nilaiAwal);

  const baris = useMemo(
    () => susunLaporan(aktif.kelas, aktif.bulan, aktif.tahun),
    [aktif]
  );

  const tanggalCetak = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const tampilkan = () => setAktif({ kelas, bulan, tahun });

  const reset = () => {
    setKelas(nilaiAwal.kelas);
    setBulan(nilaiAwal.bulan);
    setTahun(nilaiAwal.tahun);
    setAktif(nilaiAwal);
  };

  const exportPdf = () => {
    const judulAsli = document.title;
    document.title = `Laporan-Absensi-${aktif.kelas}-${namaBulan[aktif.bulan]}-${aktif.tahun}`;
    window.print();
    document.title = judulAsli;
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700";

  const th = "border border-gray-200 px-3 py-2 text-center font-semibold";
  const td = "border border-gray-200 px-3 py-2 text-center";

  return (
    <div>
      {/* Judul */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-700 text-white">
          <Printer className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Laporan Absensi Siswa</h1>
          <p className="text-sm text-gray-500">Cetak / Export laporan kehadiran siswa</p>
        </div>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        {/* Filter */}
        <div className="mb-5 flex flex-wrap items-end gap-4">
          <div className="w-44">
            <label className="mb-1 block text-xs font-semibold text-gray-700">Pilih Kelas</label>
            <select value={kelas} onChange={(e) => setKelas(e.target.value)} className={inputClass}>
              {daftarKelas.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
          <div className="w-40">
            <label className="mb-1 block text-xs font-semibold text-gray-700">Bulan</label>
            <select value={bulan} onChange={(e) => setBulan(Number(e.target.value))} className={inputClass}>
              {namaBulan.map((b, i) => (
                <option key={b} value={i}>{b}</option>
              ))}
            </select>
          </div>
          <div className="w-32">
            <label className="mb-1 block text-xs font-semibold text-gray-700">Tahun</label>
            <select value={tahun} onChange={(e) => setTahun(Number(e.target.value))} className={inputClass}>
              {daftarTahun.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <button
            onClick={tampilkan}
            className="rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            Tampilkan Laporan
          </button>
          <button
            onClick={reset}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
          {/* Preview */}
          <div className="min-w-0 xl:col-span-3">
            <div id="area-cetak" className="rounded-lg border border-gray-200 p-6">
              <div className="mb-5 text-center">
                <h2 className="text-lg font-bold text-green-700">MI HUDAL ISLAM</h2>
                <p className="text-sm font-bold text-gray-900">Laporan Absensi Siswa</p>
                <p className="text-xs text-gray-700">
                  Kelas {aktif.kelas} - Bulan {namaBulan[aktif.bulan]} {aktif.tahun}
                </p>
              </div>

              <div className="overflow-x-auto print:overflow-visible">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-green-50">
                      <th className={th}>No</th>
                      <th className={th}>NIS</th>
                      <th className={`${th} text-left`}>Nama Siswa</th>
                      <th className={th}>Hadir</th>
                      <th className={th}>Izin</th>
                      <th className={th}>Sakit</th>
                      <th className={th}>Alpa</th>
                      <th className={th}>Total Absensi</th>
                      <th className={th}>Persentase Hadir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {baris.map((b, i) => (
                      <tr key={b.nis}>
                        <td className={td}>{i + 1}</td>
                        <td className={td}>{b.nis}</td>
                        <td className={`${td} text-left`}>{b.nama}</td>
                        <td className={`${td} text-green-700`}>{b.hadir}</td>
                        <td className={`${td} text-orange-500`}>{b.izin}</td>
                        <td className={`${td} text-blue-600`}>{b.sakit}</td>
                        <td className={`${td} text-red-600`}>{b.alpha}</td>
                        <td className={td}>{b.total}</td>
                        <td className={`${td} font-semibold`}>{b.persen}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end text-xs text-gray-700">
                <div className="text-center">
                  <p>Dicetak pada {tanggalCetak}</p>
                  <p>Mengetahui,</p>
                  <p>Kepala Sekolah</p>
                  <p className="mt-10">(............................................)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Opsi export */}
          <div>
            <p className="mb-2 text-xs font-semibold text-gray-700">Opsi Export</p>
            <button
              onClick={exportPdf}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              <FileDown className="h-4 w-4" />
              Export PDF
            </button>

            <div className="mt-4 rounded-lg bg-blue-50 p-4 text-xs text-gray-700">
              <p className="mb-2 flex items-center gap-2 font-semibold text-blue-700">
                <Info className="h-4 w-4" />
                Informasi Laporan
              </p>
              <p>Kelas : {aktif.kelas}</p>
              <p>Periode : {namaBulan[aktif.bulan]} {aktif.tahun}</p>
              <p>Total Siswa : {baris.length} Orang</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}