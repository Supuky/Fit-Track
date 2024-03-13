'use client';

import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Form from '../_components/Form';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('ログインに失敗しました');
    } else {
      router.replace('/dashboard');
    };
  };

  return (
    <Form 
      mode="login"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleLoginSubmit}
    />
  );
};