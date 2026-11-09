
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  UserCog,
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type Pagination = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: User[];
  pagination: Pagination;
};

const API_URL = import.meta.env.VITE_API_URL;

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700";

export default function ManajemenUser() {
  const [data, setData] = useState<User[]>([]);
  const [cari, setCari] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 5,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mengambil data user dari backend
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      if (!API_URL) {
        throw new Error("URL backend belum dikonfigurasi di file .env");
      }

      const response = await fetch(
        `${API_URL}/users?page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(
          `Gagal mengambil data user. Status: ${response.status}`
        );
      }

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Gagal mengambil data user");
      }

      setData(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data"
      );
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  // Mengambil data ketika halaman berubah
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Pencarian berdasarkan nama dan email
  const hasil = useMemo(() => {
    const kata = cari.toLowerCase().trim();

    return data.filter(
      (user) =>
        user.name.toLowerCase().includes(kata) ||
        user.email.toLowerCase().includes(kata)
    );
  }, [data, cari]);

  // Format tanggal
  const formatTanggal = (tanggal: string) => {
    return new Date(tanggal).toLocaleString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Pagination
  const halamanSebelumnya = () => {
    if (pagination.hasPreviousPage) {
      setPage((prev) => prev - 1);
    }
  };

  const halamanSelanjutnya = () => {
    if (pagination.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  // Reset pencarian dan halaman
  const handleReset = () => {
    setCari("");
    setPage(1);
  };

  return (
    <div className="space-y-6">

      {/* Judul halaman */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-700 text-white">
            <UserCog className="h-6 w-6" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Manajemen User
            </h1>
            <p className="text-sm text-gray-500">
              Kelola dan lihat data pengguna sistem
            </p>
          </div>
        </div>

        <button
          onClick={fetchUsers}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          Refresh Data
        </button>
      </div>

      {/* Konten utama */}
      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">

        {/* Pencarian */}
        <div className="mb-5 flex flex-wrap items-end gap-4">
          <div className="min-w-64 flex-1">
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Cari User
            </label>

            <div className="relative">
              <input
                type="text"
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                placeholder="Masukkan nama atau email..."
                className={`${inputClass} pr-10`}
              />

              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>

            <button
              onClick={fetchUsers}
              disabled={loading}
              className="mt-2 text-sm font-semibold text-red-700 underline"
            >
              Coba lagi
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <RefreshCw className="mb-3 h-8 w-8 animate-spin text-green-700" />
            <p className="text-sm text-gray-500">
              Memuat data user...
            </p>
          </div>
        ) : !error ? (
          <>
            {/* Tabel user */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-50 text-gray-800">
                    <th className="px-3 py-3 text-center font-semibold">
                      No
                    </th>
                    <th className="px-3 py-3 text-left font-semibold">
                      Nama
                    </th>
                    <th className="px-3 py-3 text-left font-semibold">
                      Email
                    </th>
                    <th className="px-3 py-3 text-left font-semibold">
                      Tanggal Dibuat
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {hasil.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-10 text-center text-gray-500"
                      >
                        Data user tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    hasil.map((user, index) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-100 transition hover:bg-gray-50"
                      >
                        <td className="px-3 py-3 text-center">
                          {(page - 1) * limit + index + 1}
                        </td>

                        <td className="px-3 py-3 font-medium text-gray-800">
                          {user.name}
                        </td>

                        <td className="px-3 py-3 text-gray-600">
                          {user.email}
                        </td>

                        <td className="px-3 py-3 text-gray-600">
                          {formatTanggal(user.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Informasi jumlah data */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-gray-600">
                Menampilkan {hasil.length} data dari{" "}
                {pagination.totalItems} user
              </div>

              {/* Pagination */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  Halaman {pagination.page} dari{" "}
                  {pagination.totalPages}
                </span>

                <button
                  onClick={halamanSebelumnya}
                  disabled={!pagination.hasPreviousPage || loading}
                  className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Sebelumnya
                </button>

                <button
                  onClick={halamanSelanjutnya}
                  disabled={!pagination.hasNextPage || loading}
                  className="flex items-center gap-1 rounded-lg bg-green-700 px-3 py-2 text-sm text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Selanjutnya
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
