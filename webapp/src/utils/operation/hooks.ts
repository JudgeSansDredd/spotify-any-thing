import { useAppSelector } from '../../Store/hooks';

export const useDelta = () => {
  const updateHundreds = useAppSelector(
    (state) => state.operation.updateHundreds
  );
  const updateTens = useAppSelector((state) => state.operation.updateTens);

  if (updateHundreds) {
    return 100;
  }
  if (updateTens) {
    return 10;
  }
  return 1;
};
