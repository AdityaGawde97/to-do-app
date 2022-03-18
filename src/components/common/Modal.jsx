import styled from "styled-components";

export const Modal = ({ show, children, onClose }) => {
  if (show) {
    return (
      <div className="modal-background" onClick={onClose}>
        <div className="modal-body" onClick={(e) => e.stopPropagation()}>
          {/* <div className="d-flex justify-content-end mb-2">
            <div className="close" onClick={onClose}>
              x
            </div>
          </div> */}
          {typeof children === "function" ? children() : children}
        </div>
      </div>
    );
  }
  return null;
};
