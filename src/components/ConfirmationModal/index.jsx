import React from 'react';
import PropTypes from 'prop-types';

import './ConfirmationModal.scss';

const ConfirmationModal = ({
  isActive,
  isLoading,
  title,
  body,
  confirmButtonMessage,
  onConfirmation,
  cancelButtonMessage,
  onCancel,
}) => {
  const modifiers = isActive && 'is-active';
  const loadingModifier = isLoading && 'is-loading';

  return (
    <div className={`modal ${modifiers}`}>
      <div
        className="modal-background"
        onClick={!isLoading ? onCancel : undefined}
      />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
        </header>
        <section className="modal-card-body">{body}</section>
        <footer className="modal-card-foot">
          <button
            type="button"
            className={`button is-danger ${loadingModifier}`}
            onClick={onConfirmation}
          >
            {confirmButtonMessage}
          </button>
          <button
            type="button"
            className="button"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelButtonMessage}
          </button>
        </footer>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  confirmButtonMessage: PropTypes.string.isRequired,
  onConfirmation: PropTypes.func.isRequired,
  cancelButtonMessage: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;
