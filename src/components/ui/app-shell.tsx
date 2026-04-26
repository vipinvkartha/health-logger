"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { todayString } from "@/lib/utils";

const navItems = [
  { href: `/journal/${todayString()}`, label: "Today", icon: "edit" },
  { href: "/history", label: "History", icon: "calendar" },
  { href: "/reports", label: "Reports", icon: "file" },
];

function NavIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "edit":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-8.793 8.793-3.535.707.707-3.535 8.793-8.793z"/>
        </svg>
      );
    case "calendar":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="14" height="14" rx="2"/>
          <path d="M7 2v4M13 2v4M3 8h14"/>
        </svg>
      );
    case "file":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 2h7l5 5v11a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2z"/>
          <path d="M12 2v5h5M8 10h4M8 14h4"/>
        </svg>
      );
    default:
      return null;
  }
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Top nav bar */}
      <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-rule">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
              <path d="M24 4C20 4 14 8 14 16C14 24 20 28 24 44C28 28 34 24 34 16C34 8 28 4 24 4Z" fill="#A3B18A" opacity="0.8"/>
              <path d="M24 8C22 8 18 11 18 17C18 23 22 26 24 38C26 26 30 23 30 17C30 11 26 8 24 8Z" fill="#7D8B6A" opacity="0.6"/>
            </svg>
            <span className="font-[family-name:var(--font-display)] text-lg text-brown group-hover:text-terracotta transition-colors">
              Health Journal
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.icon === "edit" && pathname.startsWith("/journal"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-sage/15 text-sage-dark font-medium"
                      : "text-brown-muted hover:text-brown hover:bg-cream-dark/50"
                  }`}
                >
                  <NavIcon icon={item.icon} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={handleSignOut}
              className="ml-2 p-1.5 text-brown-muted hover:text-terracotta transition-colors cursor-pointer"
              title="Sign out"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17H4a2 2 0 01-2-2V5a2 2 0 012-2h3M14 14l5-4-5-4M19 10H7"/>
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
