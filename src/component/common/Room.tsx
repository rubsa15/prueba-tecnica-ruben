import { SubmitHandler, useForm } from 'react-hook-form';
import { Room as RoomType } from '../../domain/Room';
import { Button } from './Button';
import { Input } from './Input';
import { useFloors } from '../../hooks/useFloors';
import { useModal } from '../../hooks/useModal';
import Modal from './Modal';

export interface Inputs {
  maximumCapacity: number;
  occupancy: number;
}

interface Props {
  floorDescription: string;
  room: RoomType;
}

export const Room: React.FC<Props> = ({ floorDescription, room }) => {
  const { updateRoom, deleteRoom } = useFloors();
  const { openModal, isModalOpen } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const updatedRoom = { ...room };
    updatedRoom.maximumCapacity = Number(data.maximumCapacity);
    updatedRoom.occupancy = Number(data.occupancy);
    updateRoom(updatedRoom);
    openModal();
  };

  const onClickDelete = () => {
    deleteRoom(room.id);
  };

  return (
    <>
      <div className='flex flex-col bg-[#F5F7FB] rounded-[26px] p-6'>
        <p className='text-xl text-[#2E344D] font-semibold'>{`Sala ${floorDescription.toLowerCase()}`}</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-y-4 mt-4'
        >
          <Input
            name='maximumCapacity'
            id='maximumCapacity'
            label='Capacidad máxima'
            value={room.maximumCapacity}
            type='number'
            register={register}
            formValidation={{ required: true }}
            errors={errors}
          />
          <Input
            name='occupancy'
            id='occupancy'
            label='Ocupación'
            value={room.occupancy}
            type='number'
            register={register}
            formValidation={{ required: true, min: 0, max: 100 }}
            percentage
            errors={errors}
          />

          <div className='flex justify-between'>
            <Button label='Eliminar' onClick={onClickDelete} secondary />
            <Button label='Modificar' type='submit' />
          </div>
        </form>
      </div>
      <Modal isOpen={isModalOpen}>
        La sala ha sido modificada correctamente
      </Modal>
    </>
  );
};
