import { supabase } from "@/utils/supabaseClient";
import { NextRequest } from "next/server";

export async function getUserData(request: NextRequest) {
  const token = request.headers.get("Authorization") ?? "";
  
  const { data, error } = await supabase.auth.getUser(token);

  return { data, error };
};
