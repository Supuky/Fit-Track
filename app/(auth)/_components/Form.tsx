"use client";

import Image from 'next/image';
import React from 'react';
import { Mail, KeyRound } from 'lucide-react';

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
    <div className="h-svh flex justify-center items-center">
      <form onSubmit={onSubmit} className=" w-4/5 max-w-[600px] bg-base-white/80 p-8 rounded-xl shadow-xl text-base-black">
        <div className='mb-8 flex gap-2 items-center justify-center'>
          <Image 
            src="/logo.svg"
            alt="Logo"
            height={34}
            width={34}
          />
          <h2 className="font-bold text-primary text-xl">FitTrack</h2>
        </div>
        <div className="mb-4">
          <div className="relative">
            {/* <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              メールアドレス
            </label> */}
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <Mail size={20} className="text-gray-400"/>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-base-black/90 text-sm rounded-lg focus:ring-primary focus:border-primary focus-visible:outline-primary block w-full ps-10 p-2"
              placeholder="メールアドレス"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            </div>
        </div>
        <div className="mb-4">
          {/* <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            パスワード
          </label> */}
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <KeyRound size={20} className="text-gray-400"/>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="パスワード"
              className="bg-gray-50 border border-gray-300 text-base-black/90 text-sm rounded-lg focus:ring-primary focus:border-primary focus-visible:outline-primary block w-full ps-10 p-2 "
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-primary-pale focus:ring-4 focus:outline-none focus:ring-primary-pale focus-visible:outline-primary font-medium rounded-lg text-sm px-5 py-2 text-center"
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