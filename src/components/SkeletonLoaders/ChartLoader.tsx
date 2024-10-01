import { ResponsiveContainer } from 'recharts';

const ChartLoader = () => {
  return (
    <ResponsiveContainer width='90%' height={350} className='pl-5 pt-5'>
      <div className='flex flex-col items-end h-64 w-full'>
        <div className='flex items-end h-full w-full'>
          <div className='flex flex-col-reverse justify-between h-full text-center pr-4 text-dark animate-pulse'>
            <span>0</span>
            <span>20</span>
            <span>40</span>
            <span>60</span>
            <span>80</span>
            <span>100</span>
          </div>

          <div className='border-r border-dark h-full mr-4'></div>
          <div className='flex space-x-4 h-full w-full items-end'>
            <div className='flex-1 h-1/6 bg-dark animate-pulse rounded-md'></div>
            <div className='flex-1 h-2/5 bg-dark animate-pulse rounded-md'></div>
            <div className='flex-1 h-3/5 bg-dark animate-pulse rounded-md'></div>
            <div className='flex-1 h-4/5 bg-dark animate-pulse rounded-md'></div>
            <div className='flex-1 h-1/2 bg-dark animate-pulse rounded-md'></div>
            <div className='flex-1 h-full bg-dark animate-pulse rounded-md'></div>
            <div className='flex-1 h-3/4 bg-dark animate-pulse rounded-md'></div>
            <div className='flex-1 h-2/5 bg-dark animate-pulse rounded-md'></div>
          </div>
        </div>

        <div className='w-full border-t border-dark mt-4'></div>

        <div className='flex justify-between w-full mt-2'>
          <div className='h-3 w-20 mt-8 bg-dark animate-pulse rounded-md transform -rotate-45'></div>
          <div className='h-3 w-20 mt-8 bg-dark animate-pulse rounded-md transform -rotate-45'></div>
          <div className='h-3 w-20 mt-8 bg-dark animate-pulse rounded-md transform -rotate-45'></div>
          <div className='h-3 w-20 mt-8 bg-dark animate-pulse rounded-md transform -rotate-45'></div>
          <div className='h-3 w-20 mt-8 bg-dark animate-pulse rounded-md transform -rotate-45'></div>
          <div className='h-3 w-20 mt-8 bg-dark animate-pulse rounded-md transform -rotate-45'></div>
          <div className='h-3 w-20 mt-8 bg-dark animate-pulse rounded-md transform -rotate-45'></div>
          <div className='h-3 w-20 mt-8 bg-dark animate-pulse rounded-md transform -rotate-45'></div>
        </div>
      </div>
    </ResponsiveContainer>
  );
};
export default ChartLoader;
