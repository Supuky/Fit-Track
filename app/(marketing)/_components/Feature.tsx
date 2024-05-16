import React from 'react';
import Image from 'next/image';

import { LineChart, Database, FilePenLine } from 'lucide-react';


const Feature:React.FC = () => {
  return (
    <>
      <div className="py-8 mx-auto flex items-center md:max-w-screen-lg lg:pt-20 lg:h-screen">
        <div className="flex-grow">
          <h2 className="text-xl text-center font-bold text-base-black md:text-2xl lg:text-4xl">サービスの特徴</h2>
          <div className="mx-auto w-full flex items-center flex-col md:max-w-screen-xl lg:mt-16 lg:flex-row lg:justify-between">
            {/* 以下をコンポーネントにしてもいいかも featureDetail*/}
            <div className="text-center mt-8 lg:mt-0">
              <Image 
                src="/exercise.png"
                alt="トレーニング記録画面"
                width={200}
                height={390}
                className="m-auto"
              />
              <p className="text-base-black font-bold mt-4 lg:text-lg flex items-center justify-center gap-2">
                <LineChart className="text-primary"/>
                成長をグラフで確認
              </p>
              <p className="text-base-black">モチベーションの維持！</p>
            </div>
            <div className="text-center mt-8 lg:mt-0">
              <Image 
                src="/dashboard.png"
                alt="記録画面"
                width={200}
                height={390}
                className="m-auto"
              />
              <p className="text-base-black font-bold mt-4 lg:text-lg flex items-center justify-center gap-2">
                <Database className="text-primary"/>
                筋トレ内容の確認・記録
              </p>
              <p className="text-base-black">日にち毎に記録が確認可能！</p>
            </div>
            <div className="text-center mt-8 lg:mt-0">
              <Image 
                src="/form.png"
                alt="トレーニング入力画面"
                width={200}
                height={390}
                className="m-auto"
              />
              <p className="text-base-black font-bold mt-4 lg:text-lg flex items-center justify-center gap-2">
                <FilePenLine className="text-primary"/>
                トレーニングの詳細を入力
              </p>
              <p className="text-base-black">セット数や重量を入力！</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Feature;