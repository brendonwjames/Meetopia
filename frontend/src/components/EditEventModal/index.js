import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditEventPage from '../EditEventPage';
import './EditEventModal.css';

const EditEventModal = () => {
  const [showModal, setShowModal] = useState(false);
  

  return (
    <>
      <button className='edit-button'onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditEventPage closeModal={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default EditEventModal;