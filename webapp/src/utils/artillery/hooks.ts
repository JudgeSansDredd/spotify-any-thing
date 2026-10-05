import { useAppSelector } from '../../Store/hooks';
import { calculateElevation } from './methods';

export const useGetRangeDigits = () => {
  const range = useAppSelector((state) => state.artillery.range);
  return String(range).padStart(4, '0').split('');
};

export const useGetElevation = () => {
  const range = useAppSelector((state) => state.artillery.range);
  const country = useAppSelector((state) => state.artillery.country);
  const spa = useAppSelector((state) => state.artillery.spa);
  return Math.min(9999, Math.max(0, calculateElevation(country, spa, range)));
};
