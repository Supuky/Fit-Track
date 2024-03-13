"use client"

import { Value } from '@/types/calender';
import React, { useEffect, useState } from 'react';
import Calendar, { OnArgs, TileArgs } from 'react-calendar';
import './WorkoutCalendar.css';
import { formatDate, isSameDay } from 'date-fns';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';

interface Props {
  value: Value;
  onChange:  (value: any, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  // onChange:  (value: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const WorkoutCalendar: React.FC<Props> = ({
  value,
  onChange
}) => {
  const { token } = useSupabaseSession();
  const [workoutDays, setWorkoutDays] = useState<{workoutedAt: Date}[]>([]);
  const [year, setYear] = useState(value?.getFullYear());
  const [month, setMonth] = useState(value?.getMonth());

  useEffect(() => {
    if(!token) return;

    const fetcher = async () => {
      const response = await fetch(`/api/workouts/workoutedDays?year=${year}&month=${month}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      
      const { workoutDays } = await response.json();

      setWorkoutDays(workoutDays);
    };

    fetcher();
  }, [token, year, month]);

  const showWorkoutDays = ({ date, view }: TileArgs) => {
    if(view === "month") {
      for(let i = 0; i < workoutDays.length; i++) {
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