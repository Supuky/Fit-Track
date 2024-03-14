import { useState } from "react";
import { useSupabaseSession } from "./useSupabaseSession";
import { supabase } from "@/utils/supabaseClient";

const useApi = () => {
  const { token } = useSupabaseSession();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const get = async <ResponseType>(endpoint: string) => {
    setIsLoading(true);
    let data: ResponseType | null = null;

    try {
      // if(!token) throw new Error("未ログイン");
      if(!token) return null;

      const session = await supabase.auth.getSession();

      const response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: session.data.session?.access_token!,
        },
      });

      if(!response.ok) {
        throw new Error("データの取得に失敗しました。");
      };

      data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      if(error instanceof Error) {
        setError(error.message);
        throw error; 
      } 
    } finally {
      setIsLoading(false);
    };
  };

  const post = async <RequestType, ResponseType>(endpoint: string, payload: RequestType) => {
    setIsLoading(true);

    try {
      if(!token) throw new Error("未ログイン");

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token!,
        },
        body: JSON.stringify(payload),
      });

      if(!response.ok) throw new Error("保存に失敗しました。");

      const data: ResponseType = await response.json();
      console.log(data);
      
      return data;
    } catch (error) {
      if(error instanceof Error) setError(error.message);
    } finally {
      setIsLoading(false);
    };

  };

  return {get, post, isLoading, error};
};

export default useApi;