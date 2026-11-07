import { useState, type ChangeEvent, type FormEvent } from "react";
import { Settings, User, KeyRound, Camera, Eye, EyeOff, Save } from "lucide-react";

type Tab = "profil" | "password";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700";

const hitungKekuatan = (p: string) => {
  let skor = 0;
  if (p.length >= 8) skor++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) skor++;
  if (/\d/.test(p)) skor++;
  if (/[^A-Za-z0-9]/.test(p)) skor++;
  return skor;
};

const labelKekuatan = ["Sangat lemah", "Lemah", "Cukup", "Kuat", "Sangat kuat"];
const warnaKekuatan = [
  "bg-gray-300",
  "bg-red-500",
  "bg-orange-500",
  "bg-green-500",
  "bg-green-700",
];

function ProfilAkun() {
  const [nama, setNama] = useState("Administrator");
  const [username, setUsername] = useState("admin");
  const [email, setEmail] = useState("admin@mihudalislam.sch.id");
  const [foto, setFoto] = useState<string | null>(null);

  const pilihFoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran foto maksimal 2 MB.");
      return;
    }
    setFoto(URL.createObjectURL(file));
  };

  const simpan = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ nama, username, email });
    alert("Profil berhasil disimpan.");
  };

  return (
    <form onSubmit={simpan} className="max-w-2xl">
      {/* Foto */}
      <div className="mb-6 flex items-center gap-5">
        <div className="relative">
          {foto ? (
            <img
              src={foto}
              alt="Foto profil"
              className="h-24 w-24 rounded-full object-cover ring-2 ring-green-700"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-700 ring-2 ring-green-700">
              <User className="h-10 w-10" />
            </div>
          )}
          <label
            htmlFor="foto"
            className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-green-700 text-white shadow hover:bg-green-800"
            title="Ganti foto"
          >
            <Camera className="h-4 w-4" />
          </label>
          <input id="foto" type="file" accept="image/*" onChange={pilihFoto} className="hidden" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{nama || "-"}</p>
          <p className="text-sm text-gray-500">Format JPG atau PNG, maksimal 2 MB</p>
          {foto && (
            <button
              type="button"
              onClick={() => setFoto(null)}
              className="mt-1 text-xs text-red-600 hover:underline"
            >
              Hapus foto
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-700">Nama Lengkap</label>
          <input
            required
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">Username</label>
            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
      >
        <Save className="h-4 w-4" />
        Simpan Profil
      </button>
    </form>
  );
}

function GantiPassword() {
  const [lama, setLama] = useState("");
  const [baru, setBaru] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [lihat, setLihat] = useState({ lama: false, baru: false, konfirmasi: false });

  const kekuatan = baru ? hitungKekuatan(baru) : 0;

  const simpan = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (baru.length < 8) {
      alert("Password baru minimal 8 karakter.");
      return;
    }
    if (baru !== konfirmasi) {
      alert("Konfirmasi password tidak sama dengan password baru.");
      return;
    }
    if (baru === lama) {
      alert("Password baru tidak boleh sama dengan password lama.");
      return;
    }
    alert("Password berhasil diganti.");
    setLama("");
    setBaru("");
    setKonfirmasi("");
  };

  const kolom = (
    label: string,
    kunci: "lama" | "baru" | "konfirmasi",
    nilai: string,
    ubah: (v: string) => void
  ) => (
    <div>
      <label className="mb-1 block text-xs font-semibold text-gray-700">{label}</label>
      <div className="relative">
        <input
          required
          type={lihat[kunci] ? "text" : "password"}
          value={nilai}
          onChange={(e) => ubah(e.target.value)}
          className={`${inputClass} pr-10`}
        />
        <button
          type="button"
          onClick={() => setLihat({ ...lihat, [kunci]: !lihat[kunci] })}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-700"
        >
          {lihat[kunci] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <form onSubmit={simpan} className="max-w-md space-y-4">
      {kolom("Password Lama", "lama", lama, setLama)}
      {kolom("Password Baru", "baru", baru, setBaru)}

      {baru && (
        <div>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className={`h-1.5 flex-1 rounded-full ${
                  n <= kekuatan ? warnaKekuatan[kekuatan] : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="mt-1 text-xs text-gray-600">
            Kekuatan password: <b>{labelKekuatan[kekuatan]}</b>
          </p>
        </div>
      )}

      {kolom("Konfirmasi Password Baru", "konfirmasi", konfirmasi, setKonfirmasi)}

      <ul className="list-disc space-y-0.5 pl-5 text-xs text-gray-500">
        <li>Minimal 8 karakter.</li>
        <li>Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol.</li>
      </ul>

      <button
        type="submit"
        className="flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
      >
        <Save className="h-4 w-4" />
        Simpan Password
      </button>
    </form>
  );
}

export default function Pengaturan() {
  const [tab, setTab] = useState<Tab>("profil");

  const tombolTab = (id: Tab, label: string, Ikon: typeof User) => (
    <button
      onClick={() => setTab(id)}
      className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
        tab === id
          ? "border-green-700 text-green-700"
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      <Ikon className="h-4 w-4" />
      {label}
    </button>
  );

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-700 text-white">
          <Settings className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Pengaturan</h1>
          <p className="text-sm text-gray-500">Kelola profil dan keamanan akun Anda</p>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
        <div className="flex border-b border-gray-200 px-3">
          {tombolTab("profil", "Profil Akun", User)}
          {tombolTab("password", "Ganti Password", KeyRound)}
        </div>
        <div className="p-6">{tab === "profil" ? <ProfilAkun /> : <GantiPassword />}</div>
      </div>
    </div>
  );
}