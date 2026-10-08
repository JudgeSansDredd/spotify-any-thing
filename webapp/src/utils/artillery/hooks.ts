import { useAppSelector } from '../../Store/hooks';
import { ARTILLERY_TYPES, RANGE_VALUES } from './constants';
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

export const useRangeBand = () => {
  const country = useAppSelector((state) => state.artillery.country);
  const isSpa = useAppSelector((state) => state.artillery.spa);

  const { minRange, maxRange } =
    RANGE_VALUES[country][isSpa === ARTILLERY_TYPES.SPA ? 'SPA' : 'STATIONARY'];

  return { minRange, maxRange };
};

export const useRangeAsPercent = () => {
  const { minRange, maxRange } = useRangeBand();
  const range = useAppSelector((state) => state.artillery.range);

  const delta = range - minRange;
  const band = maxRange - minRange;
  return Math.floor((100 * delta) / band);
};
