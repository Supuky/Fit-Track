'use client';

import { useState } from 'react';
import Form from '../_components/Form';

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    alert("確認メールを送信しました。");
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