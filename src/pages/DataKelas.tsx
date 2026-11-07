import { useMemo, useState, type FormEvent } from "react";
import {
  Building2,
  Plus,
  Search,
  RotateCcw,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type Kelas = {
  id: number;
  kode: string;
  nama: string;
  wali: string;
  jumlah: number;
};

type FormKelas = Omit<Kelas, "id">;

const dataAwal: Kelas[] = [
  { id: 1, kode: "1A", nama: "Kelas 1.A", wali: "Siti Aisyah, S.Pd", jumlah: 26 },
  { id: 2, kode: "1B", nama: "Kelas 1.B", wali: "Lailatul Fitri, S.Pd", jumlah: 25 },
  { id: 3, kode: "2A", nama: "Kelas 2.A", wali: "Nurul Hidayah, S.Pd", jumlah: 27 },
  { id: 4, kode: "2B", nama: "Kelas 2.B", wali: "Dewi Sartika, S.Pd", jumlah: 24 },
  { id: 5, kode: "3A", nama: "Kelas 3.A", wali: "Rudi Kurniawan, S.Pd", jumlah: 25 },
  { id: 6, kode: "3B", nama: "Kelas 3.B", wali: "Yuliana, S.Pd", jumlah: 23 },
  { id: 7, kode: "4A", nama: "Kelas 4.A", wali: "Abdul Rahman, S.Pd", jumlah: 26 },
  { id: 8, kode: "4B", nama: "Kelas 4.B", wali: "Fitriani, S.Pd", jumlah: 24 },
  { id: 9, kode: "5", nama: "Kelas 5", wali: "Muhammad Faisal, S.Pd", jumlah: 25 },
  { id: 10, kode: "6", nama: "Kelas 6", wali: "Ayu Wulandari, S.Pd", jumlah: 28 },
];

const formKosong: FormKelas = { kode: "", nama: "", wali: "", jumlah: 0 };
const perHalaman = 10;

export default function DataKelas() {
  const [data, setData] = useState<Kelas[]>(dataAwal);
  const [cari, setCari] = useState("");
  const [halaman, setHalaman] = useState(1);

  const [modalBuka, setModalBuka] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormKelas>(formKosong);

  const hasil = useMemo(() => {
    const kata = cari.toLowerCase();
    return data.filter(
      (k) =>
        k.nama.toLowerCase().includes(kata) ||
        k.kode.toLowerCase().includes(kata)
    );
  }, [data, cari]);

  const totalHalaman = Math.max(1, Math.ceil(hasil.length / perHalaman));
  const awal = (halaman - 1) * perHalaman;
  const tampil = hasil.slice(awal, awal + perHalaman);

  const reset = () => {
    setCari("");
    setHalaman(1);
  };

  const bukaTambah = () => {
    setEditId(null);
    setForm(formKosong);
    setModalBuka(true);
  };

  const bukaEdit = (k: Kelas) => {
    setEditId(k.id);
    setForm({ kode: k.kode, nama: k.nama, wali: k.wali, jumlah: k.jumlah });
    setModalBuka(true);
  };

  const simpan = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editId === null) {
      setData([...data, { id: Date.now(), ...form }]);
    } else {
      setData(data.map((k) => (k.id === editId ? { ...k, ...form } : k)));
    }
    setModalBuka(false);
  };

  const hapus = (k: Kelas) => {
    if (confirm(`Hapus ${k.nama}?`)) {
      setData(data.filter((x) => x.id !== k.id));
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700";

  const tombolHal =
    "flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-xs disabled:opacity-40";

  return (
    <div>
      {/* Judul */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-700 text-white">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Data Kelas</h1>
            <p className="text-sm text-gray-500">Kelola data kelas di MI Hudal Islam</p>
          </div>
        </div>
        <button
          onClick={bukaTambah}
          className="flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          <Plus className="h-4 w-4" />
          Tambah Kelas
        </button>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        {/* Pencarian */}
        <div className="mb-5 flex flex-wrap items-end gap-4">
          <div className="w-full max-w-sm">
            <label className="mb-1 block text-xs font-semibold text-gray-700">Cari Kelas</label>
            <div className="relative">
              <input
                type="text"
                value={cari}
                onChange={(e) => {
                  setCari(e.target.value);
                  setHalaman(1);
                }}
                placeholder="Masukkan nama kelas..."
                className={`${inputClass} pr-10`}
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
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
                <th className="px-3 py-3 text-center font-semibold">Kode Kelas</th>
                <th className="px-3 py-3 text-center font-semibold">Nama Kelas</th>
                <th className="px-3 py-3 text-left font-semibold">Wali Kelas</th>
                <th className="px-3 py-3 text-center font-semibold">Jumlah Siswa</th>
                <th className="px-3 py-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tampil.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
              {tampil.map((k, i) => (
                <tr key={k.id} className="border-b border-gray-100">
                  <td className="px-3 py-3 text-center">{awal + i + 1}</td>
                  <td className="px-3 py-3 text-center">{k.kode}</td>
                  <td className="px-3 py-3 text-center">{k.nama}</td>
                  <td className="px-3 py-3">{k.wali}</td>
                  <td className="px-3 py-3 text-center">{k.jumlah}</td>
                  <td className="px-3 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => bukaEdit(k)}
                        className="rounded-md bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                        title="Ubah"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => hapus(k)}
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
            <button onClick={() => setHalaman(1)} disabled={halaman === 1} className={tombolHal}>
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setHalaman(halaman - 1)}
              disabled={halaman === 1}
              className={tombolHal}
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
              className={tombolHal}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setHalaman(totalHalaman)}
              disabled={halaman === totalHalaman}
              className={tombolHal}
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal tambah / ubah */}
      {modalBuka && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {editId === null ? "Tambah Kelas" : "Ubah Data Kelas"}
              </h2>
              <button onClick={() => setModalBuka(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={simpan} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">Kode Kelas</label>
                <input
                  required
                  value={form.kode}
                  onChange={(e) => setForm({ ...form, kode: e.target.value })}
                  placeholder="Contoh: 1A"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">Nama Kelas</label>
                <input
                  required
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  placeholder="Contoh: Kelas 1.A"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">Wali Kelas</label>
                <input
                  required
                  value={form.wali}
                  onChange={(e) => setForm({ ...form, wali: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">Jumlah Siswa</label>
                <input
                  required
                  type="number"
                  min={0}
                  value={form.jumlah}
                  onChange={(e) => setForm({ ...form, jumlah: Number(e.target.value) })}
                  className={inputClass}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalBuka(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}