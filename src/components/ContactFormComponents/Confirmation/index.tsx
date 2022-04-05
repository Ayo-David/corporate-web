import React from 'react';
import Modal from 'react-bootstrap/esm/Modal';
import './styles.scss';

interface IConfirmationProps {
  onClose: () => void;
}

const Confirmation: React.FunctionComponent<IConfirmationProps> = ({ onClose }) => {
  return (
    <div className="confirm-container">
      <Modal show={true} centered={true}>
        <Modal.Header>
          Thank you for your request{' '}
          <img
            src="/assets/icon-close-black.svg"
            alt="close"
            className="icon-close"
            onClick={onClose}
          />{' '}
        </Modal.Header>
        <Modal.Body>
          <div className="content">
            <img src="assets/icon-success.png" alt="success" />
            <div className="txt bold">Take a note of your case reference number</div>
            <div className="case-number">
              Case number<div className="green">123123</div>
            </div>
            <div className="txt">We will contact you within three working days</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-green" onClick={onClose}>
            OK
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Confirmation;
