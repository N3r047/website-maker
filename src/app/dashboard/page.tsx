"use client";
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (!session) {
      router.replace('/');
    }
  }, [session, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  if (!session) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-lg">Welcome, {session.user.email}!</p>
      <button
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
} 