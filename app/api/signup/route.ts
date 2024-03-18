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

    console.log("error", error);

    if (error) throw new Error("新規作成できませんでした。");

    // 新規登録したユーザーのデータ取得
    const { data, error: getUserError } = await supabase.auth.getUserIdentities();

    console.log("userId", data?.identities[0].user_id!);
    console.log("getUserError", getUserError);

    if(getUserError) throw new Error("エラーが発生しました。");

    // 新規登録したユーザーとプロフィールテーブルを紐付け
    const profile = await prisma.profiles.create({
      data: {
        id: data?.identities[0].user_id!,
      },
    });

    return NextResponse.json({ profile: profile }, { status: 200 });
  } catch(error) {
    return NextResponse.json({ message: "新規作成できませんでした。" }, { status: 400 });
  };
};