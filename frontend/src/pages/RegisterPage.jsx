import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { API } from "../App";

const SCHOOL_LOGO = "/assets/malignani-logo.svg";
const SCHOOL_IMAGE = "/assets/lab-cover.svg";

export default function RegisterPage({ login }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Le password non coincidono");
      return;
    }

    if (password.length < 6) {
      setError("La password deve essere di almeno 6 caratteri");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
        credentials: "include"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Errore durante la registrazione");
      }

      login(data.user, data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-split min-h-screen">
      {/* Left side - Image */}
      <div 
        className="hidden md:flex flex-col justify-end p-8 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${SCHOOL_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="relative z-10 text-white">
          <h2 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'Work Sans' }}>
            ISIS Arturo Malignani
          </h2>
          <p className="text-slate-200 text-lg">
            Laboratorio di Metrologia - Sistema di Gestione Inventario
          </p>
        </div>
      </div>

      {/* Right side - Register form */}
      <div className="flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img 
              src={SCHOOL_LOGO} 
              alt="ISIS Malignani" 
              className="h-20 w-20 object-contain"
            />
          </div>

          <Card className="border-0 shadow-none">
            <CardHeader className="text-center px-0">
              <CardTitle className="text-2xl font-semibold" style={{ fontFamily: 'Work Sans' }}>
                Registrazione
              </CardTitle>
              <CardDescription className="text-slate-500">
                Crea un nuovo account per accedere al sistema
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div 
                    className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
                    data-testid="register-error"
                  >
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Mario Rossi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    data-testid="register-name-input"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nome@malignani.ud.it"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    data-testid="register-email-input"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimo 6 caratteri"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      data-testid="register-password-input"
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Conferma password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ripeti la password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    data-testid="register-confirm-password-input"
                    className="h-11"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 btn-animate"
                  disabled={loading}
                  data-testid="register-submit-btn"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Registrazione...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <UserPlus size={18} />
                      Registrati
                    </span>
                  )}
                </Button>

              </form>

              <p className="text-center text-sm text-slate-500 mt-6">
                Hai già un account?{" "}
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  data-testid="login-link"
                >
                  Accedi
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
