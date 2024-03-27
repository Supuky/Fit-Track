'use client';

import { useState } from 'react';
import Form from '../_components/Form';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if(response.status === 200) {
        alert("アカウント登録が成功しました。\nログインしてください。");
        router.push("/login");
      };
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <Form
      mode="signup"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={handleCreateProfileSubmit}
    />
  );
};