"use client";

import React from 'react';

interface Props {
  mode : "signup" | "login",
  email: string,
  setEmail: (email: string) => void,
  password: string,
  setPassword: (password: string) => void,
  onSubmit: (e: React.FormEvent) => Promise<void>
};

const Form: React.FC<Props> = ({
  mode,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit
}) => {
  return (
    <div className="flex justify-center pt-[240px]">
      <form onSubmit={onSubmit} className="space-y-4 w-full max-w-[400px]">
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
            value={email}
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
            value={password}
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-primary-pale focus:ring-4 focus:outline-none focus:ring-primary-pale focus-visible:outline-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {
              mode === "signup" ? "新規登録" : "ログイン"
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;