"use client";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  return (
    <button
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
} 