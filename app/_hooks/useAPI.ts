import { supabase } from "@/utils/supabaseClient";

const useApi = () => {
  const get = async <ResponseType>(endpoint: string) => {
    try {
      const response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: (await supabase.auth.getSession()).data.session?.access_token!,
        },
      });

      if(!response.ok) {
        throw new Error("データの取得に失敗しました。");
      };

      const data: ResponseType = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      if(error instanceof Error) {
        throw error;
      };
    };
  };

  const post = async <RequestType, ResponseType>(endpoint: string, payload: RequestType) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await supabase.auth.getSession()).data.session?.access_token!,
        },
        body: JSON.stringify(payload),
      });

      if(!response.ok) throw new Error("保存に失敗しました。");

      const data: ResponseType = await response.json();
      console.log(data);
      
      return data;
    } catch (error) {
      throw error;
    };
  };

  const put = async <RequestType, ResponseType>(endpoint: string, payload: RequestType) => {
    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await supabase.auth.getSession()).data.session?.access_token!,
        },
        body: JSON.stringify(payload),
      });

      if(!response.ok) throw new Error("保存に失敗しました。");

      const data: ResponseType = await response.json();
      console.log(data);
      
      return data;
    } catch (error) {
      throw error;
    };
  };

  const del = async <RequestType, ResponseType>(endpoint: string) => {
    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await supabase.auth.getSession()).data.session?.access_token!,
        },
      });

      if(!response.ok) throw new Error("保存に失敗しました。");

      const data = await response.json();
      console.log(data);
      
      return data;
    } catch (error) {
      throw error;
    };
  };

  return { get, post, put, del };
};

export default useApi;