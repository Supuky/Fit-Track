'use client';

import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Form from '../_components/Form';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { session } = useSupabaseSession();

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

  useEffect(() => {
    if(session){
      router.push("/dashboard");
    };
  }, [session, router]);

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