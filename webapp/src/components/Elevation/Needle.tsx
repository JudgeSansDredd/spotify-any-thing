import { useAppSelector } from '../../Store/hooks';
import { useGetElevation } from '../../utils/artillery/hooks';
import { COUNTRIES } from '../../utils/constants';

export default function Needle() {
  const elevation = useGetElevation();
  const country = useAppSelector((state) => state.artillery.country);

  const rotation =
    country === COUNTRIES.MORTAR_VIETNAM
      ? 90 - elevation
      : 90 - elevation * 0.05625;

  return (
    <div
      className="absolute w-1 left-1/2 h-full bg-red-600"
      style={{ transform: `translateX(-0.12rem) rotate(${rotation}deg)` }}
    />
  );
}
