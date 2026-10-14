import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { usePage } from "../../hooks/usePage";
import { ApiError, api } from "../../lib/api";
export default function Login() {
  usePage("Admin sign in | Ethixweb", undefined, true);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    try {
      await api("/api/admin/login", { method: "POST", body: JSON.stringify({ password }) });
      navigate("/admin", { replace: true });
    }
    catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not sign in.");
      setBusy(false);
    }
  }
  return (<div className="min-h-screen bg-wash px-5 pt-[12vh]">
    <form onSubmit={onSubmit} className="mx-auto grid w-full max-w-sm gap-5 rounded-[20px] border border-line bg-white p-8" aria-label="Admin sign in">
    <Logo />
    <h1 className="text-2xl font-bold">Admin sign in</h1>
    <div className="grid gap-1.5">
      <label htmlFor="password" className="text-[0.95rem] font-semibold">Password</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required className="input" aria-invalid={error ? true : undefined} aria-describedby={error ? "login-error" : undefined}/>
      {error && <p id="login-error" role="alert" className="field-error">{error}</p>}
    </div>
    <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
    </form>
  </div>);
}
