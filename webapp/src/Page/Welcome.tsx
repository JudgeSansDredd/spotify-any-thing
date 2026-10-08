import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { setCountry, setRange, setSPA } from '../Store/slices/artillerySlice';
import {
  setUpdateHundreds,
  setUpdateTens,
} from '../Store/slices/operationSlice';
import ButtonLabel from '../components/ButtonLabel';
import Elevation from '../components/Elevation';
import RangeBar from '../components/RangeBar';
import {
  Buttons,
  type LabelableButtons,
  WheelDirection,
  useKeyDown,
  useKeyUp,
  useWheel,
} from '../utils/ButtonHelper';
import { ARTILLERY_TYPES } from '../utils/artillery/constants';
import { useRangeBand } from '../utils/artillery/hooks';
import { COUNTRIES } from '../utils/constants';
import { WHEEL_SPEEDS } from '../utils/operation/constants';
import { useDelta } from '../utils/operation/hooks';

export default function Welcome() {
  const [wheelSpeedIndex, setWheelSpeedIndex] = useState<number>(0);
  const [wheelActive, setWheelActive] = useState<number>(0);
  const delta = useDelta();
  const dispatch = useAppDispatch();
  const updateHundreds = useAppSelector(
    (state) => state.operation.updateHundreds
  );
  const updateTens = useAppSelector((state) => state.operation.updateTens);
  const updateOnes = !(updateTens || updateHundreds);
  const { minRange, maxRange } = useRangeBand();
  const range = useAppSelector((state) => state.artillery.range);
  const country = useAppSelector((state) => state.artillery.country);
  const artilleryType = useAppSelector((state) => state.artillery.spa);

  useEffect(() => {
    if (range < minRange) {
      dispatch(setRange(minRange));
    }
    if (range > maxRange) {
      dispatch(setRange(maxRange));
    }
  }, [dispatch, range, minRange, maxRange]);

  const [labelState, setLabelState] = useState<
    Partial<Record<LabelableButtons, boolean>>
  >({
    [Buttons.Button4]: false,
    [Buttons.ButtonFront]: false,
  });

  useKeyDown({
    [Buttons.Button1]: () => dispatch(setUpdateHundreds(!updateHundreds)),
    [Buttons.Button2]: () => dispatch(setUpdateTens(!updateTens)),
    [Buttons.Button3]: () => {
      dispatch(setUpdateTens(false));
      dispatch(setUpdateHundreds(false));
    },
    [Buttons.Button4]: () => {
      setLabelState({ ...labelState, [Buttons.Button4]: true });
      const countries = Object.values(COUNTRIES);
      const nextIndex = (countries.indexOf(country) + 1) % countries.length;
      dispatch(setCountry(countries[nextIndex]));
    },
    [Buttons.Button5]: () => {
      const newIndex = (wheelSpeedIndex + 1) % WHEEL_SPEEDS.length;
      setWheelSpeedIndex(newIndex);
    },
    [Buttons.ButtonFront]: () => {
      setLabelState({ ...labelState, [Buttons.ButtonFront]: true });
      if (artilleryType === ARTILLERY_TYPES.SPA) {
        dispatch(setSPA(ARTILLERY_TYPES.STATIONARY));
      } else {
        dispatch(setSPA(ARTILLERY_TYPES.SPA));
      }
    },
    [Buttons.ButtonWheel]: () => setWheelSpeedIndex(0),
  });

  useKeyUp({
    [Buttons.Button4]: () =>
      setLabelState({ ...labelState, [Buttons.Button4]: false }),
    [Buttons.ButtonFront]: () =>
      setLabelState({ ...labelState, [Buttons.ButtonFront]: false }),
  });

  useWheel((direction) => {
    setWheelActive((wheelActive + 1) % WHEEL_SPEEDS[wheelSpeedIndex]);
    if (wheelActive === 0) {
      const coefficient = direction === WheelDirection.Right ? 1 : -1;
      const newRange = range + coefficient * delta;
      dispatch(setRange(newRange));
    }
  });

  const labelStyles = {
    styleClasses: 'text-black bg-white',
    activeStyleClasses: 'text-white bg-red-600',
  };

  return (
    <>
      <ButtonLabel
        button={Buttons.Button1}
        label="By 100s"
        labelActive={updateHundreds}
        {...labelStyles}
      />
      <ButtonLabel
        button={Buttons.Button2}
        label="By 10s"
        labelActive={updateTens}
        {...labelStyles}
      />
      <ButtonLabel
        button={Buttons.Button3}
        label="By 1s"
        labelActive={updateOnes}
        {...labelStyles}
      />
      <ButtonLabel
        button={Buttons.Button4}
        label="Change Country"
        labelActive={labelState[Buttons.Button4] ?? false}
        {...labelStyles}
      />
      <ButtonLabel
        button={Buttons.ButtonFront}
        label="Toggle SPA"
        labelActive={labelState[Buttons.ButtonFront] ?? false}
        {...labelStyles}
      />
      <div className="absolute p-4 w-3/4 top-[50px] left-0 right-0 bottom-0 overflow-y-hidden">
        <div className="flex w-full">
          <div>
            {country}
            {country !== COUNTRIES.MORTAR_VIETNAM &&
              (artilleryType === ARTILLERY_TYPES.SPA
                ? ' - Self Propelled Artillery'
                : ' - Stationary Artillery')}
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div>Min Range: {minRange}</div>
          <div>Max Range: {maxRange}</div>
        </div>
        <div className="flex justify-center">
          <RangeBar />
        </div>
        <Elevation />
      </div>
    </>
  );
}
