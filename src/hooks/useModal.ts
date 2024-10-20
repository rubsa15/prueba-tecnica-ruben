import { useState } from 'react';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);

    setTimeout(() => {
      setIsModalOpen(false);
    }, 2000);
  };

  return { isModalOpen, openModal };
};
