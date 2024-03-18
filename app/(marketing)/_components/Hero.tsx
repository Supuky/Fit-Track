import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <>
      <div className="pt-14 lg:h-screen">
        <div className="lg:h-full bg-gradient-to-bl from-gradient-from to-gradient-to flex items-center ">
          <div className="py-8 mx-auto w-full flex items-center flex-col md:max-w-screen-lg lg:py-0 lg:flex-row lg:justify-between">
            <div>
              <h2 className="text-xl text-center font-bold text-base-black md:text-2xl lg:text-4xl lg:text-left">
                <span className="text-2xl text-primary md:text-3xl lg:text-5xl">筋</span>トレの<span className="text-2xl text-primary md:text-3xl lg:text-5xl">進捗</span>を一目で把握！
              </h2>
              <p className="text-center text-base-black mt-2 md:text-lg lg:text-xl lg:text-left">あなたの筋トレの進捗を一目で確認できるように、<br/>魅力的なダッシュボードを提供します。</p>
              <div className="text-center mt-8 mb-8 lg:mb-0 lg:text-left">
                <Link 
                  href="/signup" 
                  className="px-4 py-2 font-bold bg-primary hover:bg-primary-pale text-white rounded-lg md:px-8 md:text-xl "
                >
                  新規登録
                </Link>
              </div>
            </div>
            <div>
              <Image 
                src="/record.png"
                alt="記録画面"
                width={320}
                height={568}
                className="hidden md:block rounded-xl shadow-xl"
              />
              <Image 
                src="/record.png"
                alt="記録画面"
                width={150}
                height={270}
                className="block md:hidden rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;