"use client";

import Link from "next/link";

const navItems = ["Product", "Resources", "Customers", "Pricing"];

export function Navigation() {
  return (
    <nav className="border-b border-border-default">
      <div className="mx-auto flex max-w-[1216px] items-center justify-between px-6 py-6">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          flux
        </Link>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-6 text-sm text-text-nav">
            {navItems.map((item) => (
              <Link
                key={item}
                href="#"
                className="transition-colors hover:text-text-primary"
              >
                {item}
              </Link>
            ))}
          </div>

          <Link
            href="#"
            className="text-sm text-text-nav transition-colors hover:text-text-primary"
          >
            Log In
          </Link>

          <Link
            href="#"
            className="rounded bg-accent border border-accent-dark/50 px-3 py-1 text-sm text-accent-text transition-opacity hover:opacity-90"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
