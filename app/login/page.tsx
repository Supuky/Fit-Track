'use client';

import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('ログインに失敗しました');
    } else {
      router.replace('/admin/dashboard');
    };
  };

  return (
    <div className="flex justify-center pt-[240px]">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-[400px]">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            メールアドレス
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary focus-visible:outline-primary block w-full p-2.5"
            placeholder="name@company.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            パスワード
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary focus-visible:outline-primary block w-full p-2.5"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full text-white bg-primary-pale hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-pale focus-visible:outline-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            ログイン
          </button>
        </div>
      </form>
    </div>
  );
};