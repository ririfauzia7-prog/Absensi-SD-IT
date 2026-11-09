export type Role = "admin" | "user";

export type User = {
  id: number;
  nama: string;
  username: string;
  password: string;
  role: Role;
  aktif: boolean;
};

const KUNCI = "users_v2";

const awal: User[] = [
  { id: 1, nama: "Administrator", username: "admin", password: "admin123", role: "admin", aktif: true },
  { id: 2, nama: "Siti Aisyah, S.Pd", username: "guru", password: "guru123", role: "user", aktif: true },
];

export const ambilUsers = (): User[] => {
  try {
    const raw = localStorage.getItem(KUNCI);
    if (raw) return JSON.parse(raw) as User[];
  } catch {
    // abaikan, pakai data awal
  }
  localStorage.setItem(KUNCI, JSON.stringify(awal));
  return awal;
};

export const simpanUsers = (data: User[]) => {
  localStorage.setItem(KUNCI, JSON.stringify(data));
};