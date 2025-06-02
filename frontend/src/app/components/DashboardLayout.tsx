import React from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <nav className="w-56 bg-gray-100 shadow-md p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Choreboard</h2>
        <Link href="/dashboard" className="text-lg text-gray-800 font-semibold hover:text-blue-600">Dashboard</Link>
        <Link href="/chores" className="text-lg text-gray-800 font-semibold hover:text-blue-600">Chores</Link>
        <Link href="/leaderboard" className="text-lg text-gray-800 font-semibold hover:text-blue-600">Leaderboard</Link>
        <Link href="/account" className="text-lg text-gray-800 font-semibold hover:text-blue-600 mt-auto">Account</Link>
      </nav>
      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
