"use client"

import React, { useEffect, useState } from 'react';
import Calendar, { OnArgs, TileArgs } from 'react-calendar';
import { formatDate, isSameDay } from 'date-fns';
import useApi  from '@/app/_hooks/useApi';
import { Value } from '@/types/calender';
import './WorkoutCalendar.css';
import { Dumbbell } from 'lucide-react';
import DashboardSkeleton from './DashboardSkeleton';

interface Props {
  value: Value;
  onChange:  (value: any, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  // onChange:  (value: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

interface WorkoutDay {
  workoutedAt: Date
};

interface ApiResponse {
  workoutDays: WorkoutDay[];
};

const WorkoutCalendar: React.FC<Props> = ({
  value,
  onChange
}) => {
  const [year, setYear] = useState(value?.getFullYear());
  const [month, setMonth] = useState(value?.getMonth());
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[] | null>(null);
  const api = useApi();

  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await api.get<ApiResponse>(`/api/workouts/workoutedDays?year=${year}&month=${month}`);
  
        if(response) {
          const { workoutDays } = response;
          setWorkoutDays(workoutDays);
        }
      } catch (error) {
        console.log(error);
        alert("取得に失敗しました。");
      }
    };
    
    fetcher();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  const showWorkoutDays = ({ date, view }: TileArgs) => {
    if(workoutDays && view === "month") {
      for(let i = 0; i < workoutDays.length; i++) {
        const workoutDay = workoutDays[i].workoutedAt;
        if(isSameDay(date, workoutDay)) return <div className="stamp text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70"><Dumbbell size={20} className=" rotate-90"/></div>;
      };
    };
    return null;
  };

  const changedMonth = ({ activeStartDate }: OnArgs) => {
    if(activeStartDate) {
      setMonth(activeStartDate.getMonth());
      setYear(activeStartDate.getFullYear());
    };
  };

  if(!workoutDays) return <DashboardSkeleton />;

  return (
    <Calendar 
      onChange={onChange} 
      value={value} 
      formatDay={(locale, date) => formatDate(date, "d")}
      showFixedNumberOfWeeks={true}
      calendarType='gregory'
      locale='ja-JP'
      next2Label={null}
      prev2Label={null}
      tileContent={showWorkoutDays}
      onActiveStartDateChange={changedMonth}
    />
  );
};

export default WorkoutCalendar;