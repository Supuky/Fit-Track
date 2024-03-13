import { useEffect, useState } from "react";
import { WeightType } from "@/types/workout";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { format, parseISO } from "date-fns";

export const useWeights = () => {
  const { token } = useSupabaseSession();
  const [weights, setWeights] = useState<WeightType[]>([]);

  useEffect(() => {
    if(!token) return;

    const fetcher = async() => {
      const response = await fetch("/api/weights", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const { weights } = await response.json();
      // console.log( weights );

      weights.forEach((weight: WeightType) => {
        let date = parseISO(weight.measuredAt);
        weight.measuredAt = format(date, "M/d");
      });
      
      setWeights(weights);
    };

    fetcher();
  }, [token]);

  return { weights };
};