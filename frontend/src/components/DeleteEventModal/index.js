import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteEventPage from '../DeleteEventPage';

const DeleteEventModal = ({ event }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteEventPage closeModal={() => setShowModal(false)} event={event}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteEventModal;