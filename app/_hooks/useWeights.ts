import { useEffect, useState } from "react";
import { WeightType } from "@/types/workout";
import { format, parseISO } from "date-fns";
import useApi from "./useApi";

export const useWeights = () => {
  const [weights, setWeights] = useState<WeightType[]>([]);
  const api = useApi();

  useEffect(() => {
    const fetcher = async() => {
      try {
        const response = await api.get("/api/weights");
  
        const { weights } = response;
  
        weights.forEach((weight: WeightType) => {
          let date = parseISO(weight.measuredAt);
          weight.measuredAt = format(date, "M/d");
        });
        
        setWeights(weights);
      } catch (error) {
        console.log(error);
        alert("取得に失敗しました。")
      };
    };

    fetcher();
  }, []);

  return { weights };
};