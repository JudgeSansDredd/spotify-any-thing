import { useAppSelector } from '../Store/hooks';
import { useRangeAsPercent } from '../utils/artillery/hooks';

export default function RangeBar() {
  const percentRange = useRangeAsPercent();
  const range = useAppSelector((state) => state.artillery.range);

  return (
    <div className="w-full">
      <div className="overflow-hidden w-full bg-gray-600 rounded-full h-2.5 relative">
        <div
          className="absolute bg-red-600 h-2.5 w-1"
          style={{ left: `${percentRange}%` }}
        />
      </div>
      <div className="w-full relative">
        <div
          className="absolute flex flex-col w-[20%]"
          style={{ left: `${Math.min(80, percentRange)}%` }}
        >
          <div>Range: {range}</div>
        </div>
      </div>
    </div>
  );
}
