"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export function AuthModal({ open }: { open: boolean }) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;
    if (mode === "signin") {
      success = signIn(email, password);
      if (!success) setError("Invalid demo credentials");
    } else {
      success = signUp(name, email, password);
      if (!success) setError("Use demo credentials: demo@bioharvest.ai / demo123");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">{mode === "signin" ? "Sign In" : "Sign Up"}</h2>
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="mb-3 w-full px-3 py-2 border rounded"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mb-3 w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-3 w-full px-3 py-2 border rounded"
          required
        />
        {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
        <Button type="submit" className="w-full bg-emerald-600 text-white font-semibold py-2 rounded mb-2">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </Button>
        <div className="text-center">
          {mode === "signin" ? (
            <span className="text-sm">No account? <button type="button" className="text-emerald-600 underline" onClick={() => { setMode("signup"); setError(""); }}>Sign Up</button></span>
          ) : (
            <span className="text-sm">Already have an account? <button type="button" className="text-emerald-600 underline" onClick={() => { setMode("signin"); setError(""); }}>Sign In</button></span>
          )}
        </div>
        <div className="mt-4 text-xs text-slate-500 text-center">Demo credentials: <br />demo@bioharvest.ai / demo123</div>
      </form>
    </div>
  );
}
