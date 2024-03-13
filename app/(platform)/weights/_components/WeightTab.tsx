"use client"

import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./WeightTab.css";
import Weights from './Weights';
import { useWeights } from '@/app/_hooks/useWeights';
import Chart from './Chart';

const WeightTab: React.FC = () => {
  const { weights } = useWeights();

  return (
    <Tabs className="rounded-xl border-none mt-10">
      <TabList>
        <Tab>一覧</Tab>
        <Tab>グラフ</Tab>
      </TabList>

      <TabPanel className="flex flex-col justify-center items-center">
        <Weights weights={weights}/>
      </TabPanel>
      <TabPanel className="h-svh">
        <Chart weights={weights}/>
      </TabPanel>
    </Tabs>
  );
};

export default WeightTab;