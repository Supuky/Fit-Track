"use client"

import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./RecordTab.css";

interface Props {
  onSelect: (index: number) => void,
};

const RecordTab: React.FC<Props> = ({ onSelect }) => {
  return (
    <Tabs className="m-auto w-10/12 rounded-xl border-none" onSelect={onSelect}>
      <TabList>
        <Tab>1ヶ月</Tab>
        <Tab>6ヶ月</Tab>
        <Tab>1年</Tab>
        <Tab>全期間</Tab>
      </TabList>

      {/* 警告が出るため記載 */}
      <TabPanel>
      </TabPanel>
      <TabPanel>
      </TabPanel>
      <TabPanel>
      </TabPanel>
      <TabPanel>
      </TabPanel>
    </Tabs>
  );
};

export default RecordTab;