"use client"

import React, { useEffect, useState } from 'react';
import Calendar, { OnArgs, TileArgs } from 'react-calendar';
import { formatDate, isSameDay } from 'date-fns';
import useApi  from '@/app/_hooks/useApi';
import { Value } from '@/types/calender';
import './WorkoutCalendar.css';

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
  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>([]);
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
    if(view === "month") {
      for(let i = 0; i < workoutDays?.length; i++) {
        const workoutDay = workoutDays[i].workoutedAt;
        if(isSameDay(date, workoutDay)) return "workout-day";
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
      tileClassName={showWorkoutDays}
      onActiveStartDateChange={changedMonth}
    />
  );
};

export default WorkoutCalendar;