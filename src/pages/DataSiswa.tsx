import { useMemo, useState, type FormEvent } from "react";
import {
  Users,
  Plus,
  Search,
  RotateCcw,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Siswa = {
  id: number;
  nis: string;
  nama: string;
  kelas: string;
  jk: "Laki-laki" | "Perempuan";
  tglLahir: string;
};

type FormSiswa = Omit<Siswa, "id">;

const daftarKelas = ["1.A", "1.B", "2.A", "2.B", "3.A", "3.B", "4.A", "4.B", "5.A", "6.A"];
const namaDepan = ["Ahmad", "Aisyah", "Muhammad", "Zahra", "Fadli", "Nabila", "Raihan", "Adzka", "Bima", "Khansa"];
const namaBelakang = ["Al-Farizi", "Nur Zahra", "Rizky", "Putri", "Ramadhan", "Maulana"];

const dataAwal: Siswa[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  nis: `24${String(i + 1).padStart(4, "0")}`,
  nama: `${namaDepan[i % namaDepan.length]} ${namaBelakang[i % namaBelakang.length]}`,
  kelas: daftarKelas[i % daftarKelas.length],
  jk: i % 2 === 0 ? "Laki-laki" : "Perempuan",
  tglLahir: `201${(i % 5) + 4}-0${(i % 9) + 1}-1${i % 9}`,
}));

const formKosong: FormSiswa = {
  nis: "",
  nama: "",
  kelas: daftarKelas[0],
  jk: "Laki-laki",
  tglLahir: "",
};

const perHalaman = 10;

const formatTanggal = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

export default function DataSiswa() {
  const [data, setData] = useState<Siswa[]>(dataAwal);
  const [filterKelas, setFilterKelas] = useState("");
  const [cari, setCari] = useState("");
  const [halaman, setHalaman] = useState(1);

  const [modalBuka, setModalBuka] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<FormSiswa>(formKosong);

  const hasil = useMemo(() => {
    const kata = cari.toLowerCase();
    return data.filter(
      (s) =>
        (filterKelas === "" || s.kelas === filterKelas) &&
        (s.nama.toLowerCase().includes(kata) || s.nis.includes(kata))
    );
  }, [data, filterKelas, cari]);

  const totalHalaman = Math.max(1, Math.ceil(hasil.length / perHalaman));
  const awal = (halaman - 1) * perHalaman;
  const tampil = hasil.slice(awal, awal + perHalaman);

  const reset = () => {
    setFilterKelas("");
    setCari("");
    setHalaman(1);
  };

  const bukaTambah = () => {
    setEditId(null);
    setForm(formKosong);
    setModalBuka(true);
  };

  const bukaEdit = (s: Siswa) => {
    setEditId(s.id);
    setForm({ nis: s.nis, nama: s.nama, kelas: s.kelas, jk: s.jk, tglLahir: s.tglLahir });
    setModalBuka(true);
  };

  const simpan = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editId === null) {
      setData([{ id: Date.now(), ...form }, ...data]);
    } else {
      setData(data.map((s) => (s.id === editId ? { ...s, ...form } : s)));
    }
    setModalBuka(false);
  };

  const hapus = (s: Siswa) => {
    if (confirm(`Hapus data ${s.nama}?`)) {
      setData(data.filter((x) => x.id !== s.id));
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
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Data Siswa</h1>
            <p className="text-sm text-gray-500">Kelola data seluruh siswa MI Hudal Islam</p>
          </div>
        </div>
        <button
          onClick={bukaTambah}
          className="flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          <Plus className="h-4 w-4" />
          Tambah Siswa
        </button>
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        {/* Filter */}
        <div className="mb-5 flex flex-wrap items-end gap-4">
          <div className="w-56">
            <label className="mb-1 block text-xs font-semibold text-gray-700">Filter Kelas</label>
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

          <div className="min-w-64 flex-1">
            <label className="mb-1 block text-xs font-semibold text-gray-700">Cari Siswa</label>
            <div className="relative">
              <input
                type="text"
                value={cari}
                onChange={(e) => {
                  setCari(e.target.value);
                  setHalaman(1);
                }}
                placeholder="Masukkan nama siswa atau NIS..."
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
                <th className="px-3 py-3 text-center font-semibold">NIS</th>
                <th className="px-3 py-3 text-left font-semibold">Nama Siswa</th>
                <th className="px-3 py-3 text-center font-semibold">Kelas</th>
                <th className="px-3 py-3 text-center font-semibold">Jenis Kelamin</th>
                <th className="px-3 py-3 text-center font-semibold">Tanggal Lahir</th>
                <th className="px-3 py-3 text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tampil.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
              {tampil.map((s, i) => (
                <tr key={s.id} className="border-b border-gray-100">
                  <td className="px-3 py-3 text-center">{awal + i + 1}</td>
                  <td className="px-3 py-3 text-center">{s.nis}</td>
                  <td className="px-3 py-3">{s.nama}</td>
                  <td className="px-3 py-3 text-center">{s.kelas}</td>
                  <td className="px-3 py-3 text-center">{s.jk}</td>
                  <td className="px-3 py-3 text-center">{formatTanggal(s.tglLahir)}</td>
                  <td className="px-3 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => bukaEdit(s)}
                        className="rounded-md bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                        title="Ubah"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => hapus(s)}
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

      {/* Modal tambah / ubah */}
      {modalBuka && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {editId === null ? "Tambah Siswa" : "Ubah Data Siswa"}
              </h2>
              <button onClick={() => setModalBuka(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={simpan} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">NIS</label>
                <input
                  required
                  value={form.nis}
                  onChange={(e) => setForm({ ...form, nis: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">Nama Siswa</label>
                <input
                  required
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">Kelas</label>
                  <select
                    value={form.kelas}
                    onChange={(e) => setForm({ ...form, kelas: e.target.value })}
                    className={inputClass}
                  >
                    {daftarKelas.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-700">Jenis Kelamin</label>
                  <select
                    value={form.jk}
                    onChange={(e) => setForm({ ...form, jk: e.target.value as FormSiswa["jk"] })}
                    className={inputClass}
                  >
                    <option>Laki-laki</option>
                    <option>Perempuan</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700">Tanggal Lahir</label>
                <input
                  required
                  type="date"
                  value={form.tglLahir}
                  onChange={(e) => setForm({ ...form, tglLahir: e.target.value })}
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