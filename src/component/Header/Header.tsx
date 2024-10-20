import { useFloors } from '../../hooks/useFloors';
import { Dropdown } from '../common/Dropdown';

export const Header = () => {
  const { floorsOptions, selectedFloorId, updateSelectedFloor, isLoading } =
    useFloors();
  return (
    <header>
      <p className='font-bold text-3xl text-[#2E344D] mt-4'>Salas</p>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className='w-44 mt-4'>
          <Dropdown
            name='floor'
            id='floor'
            options={floorsOptions}
            value={selectedFloorId}
            onChange={updateSelectedFloor}
          />
        </div>
      )}
    </header>
  );
};
