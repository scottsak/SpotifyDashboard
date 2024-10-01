import useRecentlyPlayedTracks from '../../../hooks/spotifyHooks/useRecentlyPlayedTracks';
import ChartLoader from '../../SkeletonLoaders/ChartLoader';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';

interface Charts {}

const Charts: React.FC<Charts> = () => {
  const { recentlyPlayedStats, loading: statsLoading } = useRecentlyPlayedTracks();
  const handleBarClick = (data: any) => {
    window.open(data.uri, '_blank');
  };
  return (
    <div className='relative flex flex-col'>
      <h2 className='text-2xl mt-5'>Last 50 Songs</h2>
      {statsLoading ? (
        <ChartLoader />
      ) : (
        <ResponsiveContainer width='100%' height={350} className='pt-5'>
          <BarChart
            width={100}
            height={100}
            data={recentlyPlayedStats}
            margin={{
              right: 30,
              bottom: 60,
            }}
          >
            <CartesianGrid horizontal={false} vertical={false} strokeDasharray='4' />
            <XAxis dataKey='name' angle={-45} textAnchor='end' className='pt-20' />
            <YAxis />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#282828' }} />
            <Legend content={CustomLegend} height={20} />
            <Bar dataKey='time' fill='#1cd760' onClick={(data) => handleBarClick(data)} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Charts;

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    // Function to format duration from milliseconds to "minutes:seconds"
    const formatDuration = (durationMs: number | undefined): string => {
      const totalSeconds = Math.floor(durationMs || 0 / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return `${hours ? `${hours} hours ` : ''}${minutes} minutes ${seconds} seconds`;
    };
    return (
      <div className='p-4 bg-darker flex flex-col rounded-md'>
        <div className='p-4 flex rounded-md'>
          <p className='text-light text-lg'>{label}</p>
        </div>
        <div className='p-4 flex rounded-md'>
          <p className='text-sm'>
            Time Listened:
            <span className='ml-2'>{`${formatDuration(payload[0].value)}`}</span>
          </p>
        </div>
      </div>
    );
  }

  return null;
};

const CustomLegend = () => null;
