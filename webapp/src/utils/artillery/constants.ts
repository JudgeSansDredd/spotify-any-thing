import { COUNTRIES } from '../constants';

export enum INPUT_TYPES {
  DIAL = 'DIAL',
  KEYPAD = 'KEYPAD',
}

export enum ARTILLERY_TYPES {
  STATIONARY = 'STATIONARY',
  SPA = 'SPA',
}

interface RangeMils {
  range: number;
  mils: number;
}

export interface Ranges {
  range1: RangeMils;
  range2: RangeMils;
  minRange: number;
  maxRange: number;
}

type RangeValuesForCountry = Record<ARTILLERY_TYPES, Ranges>;

type RangeValues = Record<COUNTRIES, RangeValuesForCountry>;

export const RANGE_VALUES: RangeValues = {
  'United States': {
    SPA: {
      range1: {
        range: 600,
        mils: 366,
      },
      range2: {
        range: 200,
        mils: 100,
      }  ,    minRange: 200,
      maxRange: 600

    },
    STATIONARY: {
      range1: {
        range: 1600,
        mils: 622,
      },
      range2: {
        range: 100,
        mils: 978,
      },
      minRange: 100,
      maxRange: 1600
    },
  },
  Germany: {
    SPA: {
      range1: {
        range: 500,
        mils: 366,
      },
      range2: {
        range: 200,
        mils: 100,
      },      minRange: 200,
      maxRange: 600

    },
    STATIONARY: {
      range1: {
        range: 1600,
        mils: 622,
      },
      range2: {
        range: 100,
        mils: 978,
      },
            minRange: 100,
      maxRange: 1600

    },
  },
  'United Kingdom': {
    SPA: {
      range1: {
        range: 250,
        mils: 256,
      },
      range2: {
        range: 100,
        mils: 100,
      },      minRange: 200,
      maxRange: 600

    },
    STATIONARY: {
      range1: {
        range: 1600,
        mils: 267,
      },
      range2: {
        range: 100,
        mils: 533,
      },
            minRange: 100,
      maxRange: 1600

    },
  },
  'Soviet Union': {
    SPA: {
      range1: {
        range: 600,
        mils: 366,
      },
      range2: {
        range: 200,
        mils: 100,
      },
            minRange: 200,
      maxRange: 600

    },
    STATIONARY: {
      range1: {
        range: 1600,
        mils: 800,
      },
      range2: {
        range: 100,
        mils: 1120,
      },
            minRange: 100,
      maxRange: 1600

    },
  },
  'Mortar (Vietnam)': {
    STATIONARY: {
      range1: {
        range: 450,
        mils: 0,
      },
      range2: {
        range: 100,
        mils: 85,
      },
            minRange: 100,
      maxRange: 450

    },
    SPA: {
      range1: {
        range: 450,
        mils: 0,
      },
      range2: {
        range: 100,
        mils: 85,
      },
            minRange: 100,
      maxRange: 450

    },
  },
};
