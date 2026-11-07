import logo from "../assets/logo-rihla-insani.svg";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { User, LockKeyhole, Eye, EyeOff, Lock } from "lucide-react";
import "../App.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("isLogin", "true");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      {/* BAGIAN KIRI */}
      <section className="hero-panel relative w-1/2 min-h-screen bg-gradient-to-br from-green-800 to-green-950 text-white flex flex-col items-center justify-between px-8 py-10">
        <div className="text-center z-10 mt-2">
          <img src={logo} alt="Logo SD IT Rihla Insani" className="w-32 h-32 mx-auto mb-3" />

          <p className="text-lg font-medium">Sistem Informasi</p>
          <h1 className="text-3xl font-bold leading-tight">Absensi Siswa</h1>
          <div className="w-20 h-0.5 bg-yellow-400 mx-auto my-4" />
          <h2 className="text-xl font-bold text-yellow-400">SD IT Rihla Insani</h2>
          <p className="text-sm text-green-100 mt-2 leading-relaxed">
            Kelola absensi siswa dengan mudah,
            <br />
            cepat dan akurat.
          </p>
        </div>

        <div className="school-building">
          <div className="school-roof">
            <div className="school-dome" />
          </div>
          <div className="school-body">
            <div className="school-windows">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="school-window" />
              ))}
            </div>
            <div className="school-door" />
          </div>
          <div className="school-ground" />
        </div>

        <div className="absolute top-1/2 left-5 w-20 h-20 bg-green-500/10 rounded-full blur-2xl" />
      </section>

      {/* BAGIAN KANAN */}
      <section className="login-panel w-1/2 min-h-screen flex items-center justify-center px-8 md:px-12 lg:px-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-7 md:p-9">
            <div className="flex justify-center mb-3">
              <div className="w-11 h-11 bg-green-700 rounded-full flex items-center justify-center">
                <User size={25} className="text-white" />
              </div>
            </div>

            <div className="text-center mb-7">
              <h2 className="text-3xl font-bold text-gray-900">Login</h2>
              <p className="text-sm text-gray-500 mt-2">
                Masuk untuk mengakses sistem
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700"
                  />
                  <input
                    type="text"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-3 text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-10 text-sm outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-md flex items-center justify-center gap-2 transition duration-200"
              >
                <Lock size={16} />
                Login
              </button>
            </form>
          </div>

          <div className="text-center mt-5 text-xs text-gray-500 leading-relaxed">
            <p>© 2024 Sistem Informasi Absensi Siswa</p>
            <p>
              <span className="text-green-700 font-medium">Mi Hudal Islam.</span>{" "}
              All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}