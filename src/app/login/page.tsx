"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email for a confirmation link.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        router.push("/");
        router.refresh();
      }
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4">
      <div className="w-full max-w-md">
        {/* Decorative header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto">
              <path d="M24 4C20 4 14 8 14 16C14 24 20 28 24 44C28 28 34 24 34 16C34 8 28 4 24 4Z" fill="#A3B18A" opacity="0.8"/>
              <path d="M24 8C22 8 18 11 18 17C18 23 22 26 24 38C26 26 30 23 30 17C30 11 26 8 24 8Z" fill="#7D8B6A" opacity="0.6"/>
            </svg>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-brown mb-2">
            Health Journal
          </h1>
          <p className="text-brown-muted text-sm tracking-wide uppercase">
            Food & Lifestyle Tracker
          </p>
        </div>

        {/* Form card */}
        <div className="paper-texture bg-white/60 rounded-2xl shadow-sm border border-rule p-8">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-brown mb-6 text-center">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brown-light mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-cream/50 border border-rule rounded-lg text-brown placeholder:text-brown-muted/50"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brown-light mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2.5 bg-cream/50 border border-rule rounded-lg text-brown placeholder:text-brown-muted/50"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-terracotta-dark bg-terracotta-light/20 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}
            {message && (
              <p className="text-sm text-sage-dark bg-sage-light/30 px-3 py-2 rounded-lg">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-sage text-white rounded-lg font-medium hover:bg-sage-dark transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? "..." : isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }}
              className="text-sm text-brown-muted hover:text-brown transition-colors cursor-pointer"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
