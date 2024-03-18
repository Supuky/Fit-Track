import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import Weight from './Weight';
import { WeightType } from '@/types/workout';

interface Props {
  weights: WeightType[];
}

const Weights: React.FC<Props> = ({ weights }) => {
  return (
    <div className="max-w-[600px] w-2/3 m-auto">
      <Link 
        href="weights/new"
        className="flex justify-center items-center px-8 py-4 mt-4 rounded-xl shadow-xl max-w-[600px] m-auto bg-base-white
        hover:opacity-80"
      >
        <Plus className="text-primary"/>
      </Link>
      {
        weights?.map((weight) => (
          <Weight key={weight.id} id={weight.id} weight={weight.weight} recordedAt={weight.measuredAt} />
        ))
      }
      
    </div>
  );
};

export default Weights;