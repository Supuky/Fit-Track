import React from 'react';

//https://recharts.org/en-US/examples/CustomContentOfTooltip
//ドキュメントがanyのため一旦anyにする
const CustomTooltip: React.FC = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-base-white/70 rounded-xl p-4 w-40 text-base-black/90">
        <p className="text-sm mb-1">{`体重: ${payload[0].value}kg`}</p>
        <p className="text-sm mb-1">{`体脂肪率: ${payload[1].value}%`}</p>
        <p className="text-xs mb-1 text-gray-400">{`計測日 : ${label}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;