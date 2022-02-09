import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditEventPage from '../EditEventPage';

const EditEventModal = ({ event }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditEventPage closeModal={() => setShowModal(false)} event={event}/>
        </Modal>
      )}
    </>
  );
}

export default EditEventModal;