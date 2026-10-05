import { COUNTRIES } from '../constants';
import { ARTILLERY_TYPES, RANGE_VALUES, Ranges } from './constants';

function _calcualteRangeConstants({ range1, range2 }: Ranges) {
  const deltaMils = range1.mils - range2.mils;
  const deltaRange = range1.range - range2.range;
  const m = deltaMils / deltaRange;
  const b = range1.mils - m * range1.range;
  return { m, b };
}

export function calculateElevation(
  country: COUNTRIES,
  type: ARTILLERY_TYPES,
  range: number
) {
  const { m, b } = _calcualteRangeConstants(RANGE_VALUES[country][type]);
  return Math.round(m * range + b);
}
