import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditEventPage from '../EditEventPage';

const EditEventModal = () => {
  const [showModal, setShowModal] = useState(false);
  

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditEventPage closeModal={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default EditEventModal;