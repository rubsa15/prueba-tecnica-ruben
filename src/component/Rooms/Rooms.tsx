import { useFloors } from '../../hooks/useFloors';
import { Button } from '../common/Button';
import { Room } from '../common/Room';

export const Rooms: React.FC = () => {
  const { selectedFloor, addRoom, isLoading } = useFloors();

  return (
    <>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className='flex justify-between'>
            <p className='text-xl text-[#2E344D] font-semibold'>
              {selectedFloor?.description}
            </p>
            <Button label='Añadir sala' onClick={() => addRoom()} />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8'>
            {selectedFloor?.rooms.map((room) => (
              <Room
                floorDescription={selectedFloor.description}
                key={room.id}
                room={room}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};
