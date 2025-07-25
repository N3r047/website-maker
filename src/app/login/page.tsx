"use client";
import { LoginForm } from '../../components/ui/LoginForm';
import { LoginButton } from '../../components/ui/LoginButton';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-3xl font-bold">Login</h1>
      <LoginForm />
      <div className="text-gray-500">or</div>
      <LoginButton />
    </div>
  );
} 