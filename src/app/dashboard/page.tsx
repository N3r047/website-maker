"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import Link from 'next/link';
import Image from 'next/image';

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/login');
        return;
      }
      setUser(user);
      
      // Fetch profile
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
      }
      
      setProfile(profileData);
      
      // Download avatar if exists
      if (profileData?.avatar_url) {
        try {
          const { data, error } = await supabase.storage.from('avatars').download(profileData.avatar_url);
          if (error) {
            throw error;
          }
          const url = URL.createObjectURL(data);
          setAvatarUrl(url);
        } catch (error) {
          console.log('Error downloading avatar: ', error);
        }
      }
      
      setLoading(false);
    };

    getUser();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="text-center">
        {avatarUrl ? (
          <Image 
            src={avatarUrl} 
            alt="Avatar" 
            width={80}
            height={80}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-300"
          />
        ) : (
          <div className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-300 bg-gray-200 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        <p className="text-lg mb-4">
          Welcome, {profile?.full_name || user?.email}!
        </p>
        {profile?.full_name && (
          <p className="text-sm text-gray-600 mb-6">Email: {user?.email}</p>
        )}
        <p className="text-sm text-gray-600 mb-6">
          Start building your website by creating a new project.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => alert('Create new project functionality coming soon!')}
        >
          Create New Project
        </button>
        <button
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          onClick={() => alert('View projects functionality coming soon!')}
        >
          View Projects
        </button>
      </div>
      
      <div className="flex gap-4">
        <Link
          href="/account"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Account Settings
        </Link>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
} 