import type { PropsWithChildren } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  title: string;
  open: boolean;
  customSubmitTitle?: string;
  customSubmitClass?: string;
  onClose: () => void;
  onSubmit: () => void;
}

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  title,
  open,
  customSubmitTitle,
  customSubmitClass,
  onClose,
  onSubmit,
  children,
}) => {
  if (!open) return;
  return createPortal(
    <>
      <div className={`modal fade show d-block`} role="dialog" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Close
              </button>
              <button
                type="button"
                className={`btn btn-success ${customSubmitClass}`}
                onClick={onSubmit}
              >
                {customSubmitTitle ?? 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal-backdrop fade show"
        // Thêm onClick để khi người dùng click ra ngoài cũng đóng modal
        onClick={onClose}
      ></div>
    </>,
    document.body
  );
};
