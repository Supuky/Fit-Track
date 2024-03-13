import Image from 'next/image';
import React from 'react'

const Feature:React.FC = () => {
  return (
    <>
      <div className="py-8 mx-auto md:max-w-screen-lg lg:pt-20 lg:h-screen">
        <div className="">
          <h2 className="text-xl text-center font-bold text-base-black md:text-2xl lg:text-4xl">サービスの特徴</h2>
          <div className="mx-auto w-full flex items-center flex-col md:max-w-screen-xl lg:mt-16 lg:flex-row lg:justify-between">
            {/* 以下をコンポーネントにしてもいいかも featureDetail*/}
            <div className="text-center mt-8 lg:mt-0">
              <Image 
                src="/record.png"
                alt="記録画面"
                width={250}
                height={270}
                className="rounded-xl shadow-xl m-auto"
              />
              <p className="text-base-black font-bold mt-4 lg:text-lg">筋トレ内容の確認・記録</p>
              <p className="text-base-black">日にち毎に記録が確認可能！</p>
            </div>
            <div className="text-center mt-8 lg:mt-0">
              <Image 
                src="/record.png"
                alt="記録画面"
                width={250}
                height={270}
                className="rounded-xl shadow-xl m-auto"
              />
              <p className="text-base-black font-bold mt-4 lg:text-lg">トレーニングの詳細を入力</p>
              <p className="text-base-black">セット数や重量を入力！</p>
            </div>
            <div className="text-center mt-8 lg:mt-0">
              <Image 
                src="/record.png"
                alt="記録画面"
                width={250}
                height={270}
                className="rounded-xl shadow-xl m-auto"
              />
              <p className="text-base-black font-bold mt-4 lg:text-lg">成長をグラフで確認</p>
              <p className="text-base-black">モチベーションの維持！</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Feature;