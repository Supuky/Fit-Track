import React from 'react';

//https://recharts.org/en-US/examples/CustomContentOfTooltip
//ドキュメントがanyのため一旦anyにする
const CustomTooltip: React.FC = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-base-white/70 rounded-xl p-4 w-40 text-base-black/90">
        <p className="text-sm mb-1">{`1RM: ${payload[0].value}kg`}</p>
        <p className="text-xs mb-1 text-gray-400">{`トレーニング日 : ${label}`}</p>
        {/* <p className="text-xs text-gray-400">1RMとは、1回持ち上げることができる限界の重さです。</p> */}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;