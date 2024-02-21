import { PrismaClient } from "@prisma/client"; 
import { NextRequest, NextResponse } from "next/server";

import { supabase } from '@/utils/supabaseClient';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, password } = body;

    // 新規登録
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/login`,
      },
    });

    if (error) return NextResponse.json({ message: "新規登録できませんでした。" }, { status: 400 });

    // 新規登録したユーザーのデータ取得
    const { data } = await supabase.auth.getUserIdentities();

    // 新規登録したユーザーとプロフィールテーブルを紐付け
    const profile = await prisma.profiles.create({
      data: {
        id: data?.identities[0].user_id!
      }
    });

    return NextResponse.json({ profile: profile }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "新規作成できませんでした。" }, { status: 400 });
  }
}