type TopItemsCardProps = {
  imgSize: number;
};

const TopItemsCard = (props: TopItemsCardProps) => {
  const { imgSize } = props;
  return (
    <div className='inline-block mr-4 text-white rounded-lg hover:cursor-pointer'>
      <div className={`w-${imgSize} h-${imgSize} bg-dark mb-4 animate-pulse`} />
      <div className='text-left'>
        <div className='w-20 h-3 bg-dark animate-pulse rounded' />
        <div className='w-14 h-2 bg-dark animate-pulse rounded mt-2' />
      </div>
    </div>
  );
};
export default TopItemsCard;
