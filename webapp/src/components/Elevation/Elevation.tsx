import { useAppSelector } from '../../Store/hooks';
import { useGetElevation } from '../../utils/artillery/hooks';
import { COUNTRIES } from '../../utils/constants';
import Needle from './Needle';

export default function Elevation() {
  const elevation = useGetElevation();
  const country = useAppSelector((state) => state.artillery.country);

  return (
    <div className="relative mt-16 h-[450px] w-[450px]">
      <div
        className="relative h-full w-full bg-white"
        style={{
          clipPath: 'inset(0 0 50% 50%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 50%, transparent 215px, white 215px, white 225px, transparent 225px)',
          maskImage:
            'radial-gradient(circle at 50% 50%, transparent 215px, white 215px, white 225px, transparent 225px)',
        }}
      >
        <Needle />
      </div>
      <div className="absolute top-[110px] right-[110px] text-white text-2xl text-center">
        Elevation: {elevation}{' '}
        {country === COUNTRIES.MORTAR_VIETNAM ? 'deg' : 'mils'}
      </div>
    </div>
  );
}
