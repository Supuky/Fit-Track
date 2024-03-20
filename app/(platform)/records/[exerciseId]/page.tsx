"use client";

import { Record } from "@/types/workout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Chart from "./_components/Chart";
import { format, parseISO } from "date-fns";
import { MenuSquare } from "lucide-react";

import "react-tabs/style/react-tabs.css";
import useApi from "@/app/_hooks/useApi";
import RecordSkeleton from "./_components/RecordSkeleton";
import RecordTab from "./_components/RecordTab";

interface ApiResponse {
  records: Record[],
};

const RecordPage = () => {
  const { exerciseId } = useParams();
  const [records, setRecords] = useState<Record[] | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const api = useApi();

  const onSelect = (index: number) => {
    setSelectedTab(index);
  };

  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await api.get<ApiResponse>(`/api/records/${exerciseId}/?tabIndex=${selectedTab}`);
  
        if(response) {
          const { records } = response;
    
          records.forEach((record: Record) => {
            let date = parseISO(record.workoutedAt);
            record.workoutedAt = format(date, "M/d");
          });
    
          setRecords(records);
        };
      } catch (error) {
        console.log(error);
        alert("取得に失敗しました。")
      };
    };

    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseId, selectedTab]);

  if(!records) return <RecordSkeleton />;

  return (
    <>
      {records.length === 0 ? null : (
        <div
          className="flex items-center justify-center gap-2 px-8 py-4 my-4 rounded-xl max-w-[600px] m-auto bg-primary
          text-base-white shadow-xl"
        >
          <MenuSquare className="text-base-white" />
          <p className="">{records[0].name}</p>
        </div>
      )}
      <Chart records={records} />
      <RecordTab onSelect={onSelect}/>
    </>
  );
};

export default RecordPage;
