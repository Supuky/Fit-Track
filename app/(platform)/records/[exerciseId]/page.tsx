"use client";

import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Record } from "@/types/workout";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Chart from "./_components/Chart";
import { format, parseISO } from "date-fns";
import { MenuSquare } from "lucide-react";

import "react-tabs/style/react-tabs.css";
import Tab from "./_components/RecordTab";

// const DynamicMyChart = dynamic(() => import("./_components/Chart"), { ssr: false });

const RecordPage = () => {
  const { token } = useSupabaseSession();
  const { exerciseId } = useParams();
  const [records, setRecords] = useState<Record[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const onSelect = (index: number) => {
    setSelectedTab(index);
  };

  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      const response = await fetch(`/api/records/${exerciseId}/?tabIndex=${selectedTab}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const { records } = await response.json();

      records.forEach((record: Record) => {
        let date = parseISO(record.workoutedAt);
        record.workoutedAt = format(date, "M/d");
      });

      setRecords(records);
    };

    fetcher();
  }, [token, exerciseId, selectedTab]);

  return (
    <>
      {records.length === 0 ? null : (
        <div
          className="flex items-center justify-center gap-2 px-8 py-4 my-4 rounded-xl max-w-[600px] m-auto bg-primary
          text-base-white"
        >
          <MenuSquare className="text-base-white" />
          <p className="">{records[0].name}</p>
        </div>
      )}
      <Chart records={records} />
      <Tab onSelect={onSelect}/>
    </>
  );
};

export default RecordPage;
