"use client";
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export function LoginButton() {
  const supabase = useSupabaseClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github' });
  };

  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={handleLogin}
    >
      Login with GitHub
    </button>
  );
} 