import { useEffect, useState } from "react";
import { WeightType } from "@/types/workout";
import { format, parseISO } from "date-fns";
import useApi from "./useApi";

interface ApiResponse {
  weights: WeightType[],
};

export const useWeights = () => {
  const [weights, setWeights] = useState<WeightType[]>([]);
  const api = useApi();

  useEffect(() => {
    const fetcher = async() => {
      try {
        const response = await api.get<ApiResponse>("/api/weights");
  
        if(response) {
          const { weights } = response;
    
          weights.forEach((weight: WeightType) => {
            let date = parseISO(weight.measuredAt);
            weight.measuredAt = format(date, "M/d");
          });
          
          setWeights(weights);
        }
      } catch (error) {
        console.log(error);
        alert("取得に失敗しました。")
      };
    };

    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { weights };
};